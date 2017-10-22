import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { prop, pathEq, pathOr, complement, path, pipe, flatten, map } from 'ramda';
import * as moment from 'moment';

import * as worklogsListActions from '../actions/worklogs-list.actions';
import { JiraIssuesService } from '../../shared/jira-api/services/jira-issues.service';

const toJson = (response: any) => response.json();
const getIssuesProp = pathOr([], [ 'issues' ]);
const isCurrentUser = (account: any) => pathEq([ 'author', 'name' ], account.username);

function compareDates(min, max) {
  return (worklogs) => worklogs
    .filter(worklog => moment(worklog.started).isSameOrAfter(min) && moment(worklog.started).isSameOrBefore(max));
}

const getWorklogs = pipe(
  path([ 'worklogs' ]),
  map((item: any) => item.worklogs),
  flatten,
);

const getPayload = (payload) => getWorklogs(payload)
  .map((worklog: any) =>
    ({ ...worklog, issue: payload.issues.find(issue => issue.id === worklog.issueId) }));

@Injectable()
export class WorklogsListEffects {
  @Effect() public fetchWorklogsList$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.FETCH_WORKLOGS_LIST)
    .map(prop('payload'))
    .switchMap(this._fetchWorklogsList$.bind(this));

  @Effect() public syncWorklog$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.SYNC_WORKLOG)
    .map(prop('payload'))
    .switchMap(this._syncWorklog$.bind(this));

  private get _account$(): Observable<any> {
    return this._store.select(path([ 'account', 'account', 'model' ]));
  }

  constructor(
    private _actions$: Actions,
    private _jiraIssuesService: JiraIssuesService,
    private _store: Store<any>,
  ) {}

  private _fetchIssues$(from: string, to: string) {
    return this._jiraIssuesService.getList(
      `worklogDate >=  '${from}' AND worklogDate <= '${to}' AND worklogAuthor = currentUser()`,
      { maxResults: 1000, fields: '' },
    )
      .map(pipe(toJson, getIssuesProp));
  }

  private _fetchWorklogs$(key: string) {
    return this._jiraIssuesService
      .getWroklogs(key)
      .map(toJson)
      .withLatestFrom(this._account$)
      .map(([ response, account ]) => ({ ...response, worklogs: response.worklogs.filter(isCurrentUser(account)) }));
  }

  private _fetchWorklogsList$(filters: any) {
    const getWorklogsWithIssue = pipe(getPayload, compareDates(filters.from, filters.to));

    return this._fetchIssues$(filters.from, filters.to)
      .map((issues: any) => ({ issues, requests: issues.map(issue => this._fetchWorklogs$(issue.key)) }))
      .switchMap(
        ({ issues, requests }) =>
          requests.length > 0
            ? Observable
                .concat(...requests)
                .bufferCount(requests.length)
                .map((worklogs: any) => getWorklogsWithIssue({ issues, worklogs }))
                .switchMap((worklogs: any) => Observable.of(new worklogsListActions.FetchWorklogsListSuccess(worklogs)))
            : Observable.of(new worklogsListActions.FetchWorklogsListSuccess([])),
      );
  }

  private _syncWorklog$(worklog: any) {
    return this._jiraIssuesService.putWorklog(worklog.issueId, worklog.id, {
      started: worklog.started,
      timeSpentSeconds: worklog.timeSpentSeconds,
    })
      .map(response => new worklogsListActions.SyncWorklogSuccess(response.json()));
  }
}
