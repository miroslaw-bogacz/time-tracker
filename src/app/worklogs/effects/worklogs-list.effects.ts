import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { prop, pathEq, pathOr, complement, path, pipe, flatten, map, range } from 'ramda';
import * as moment from 'moment';

import * as worklogsListActions from '../actions/worklogs-list.actions';
import * as toastMessagesActions from '../../shared/toast-messages/actions/toast-messages.actions';
import { JiraIssuesService } from '../../shared/jira-api/services/jira-issues.service';
import { IAccount } from '../../account/models/i-account.model';
import { getErrorsFromPayload } from '../../core/helpers/get-errors-from-payload';
import { IFiltersState } from 'app/worklogs/models/i-filters-state.model';

function toJson(response: any) {
  try {
    return response.json();
  } catch (error) {
    return error;
  }
}

function compareDates(min, max) {
  return (worklogs) => worklogs
    .filter(worklog => {
      const date = moment(worklog.started).format('YYYY-MM-DD');
      return moment(date).isSameOrAfter(min) && moment(date).isSameOrBefore(max);
    });
}

const getGroupedRequests = (requests: any[], groupBy: number) =>
  range(0, requests.length / groupBy)
    .map((_, index) => Observable.merge(...requests.slice(index * groupBy, (index + 1) * groupBy)));

const getIssuesProp = pathOr([], [ 'issues' ]);
const isCurrentUser = (account: IAccount) => pathEq([ 'author', 'name' ], account.username);


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
    .switchMap(this._fetchWorklogsListIssues$.bind(this))
    .switchMap(this._fetchWorklogsList$.bind(this));

  @Effect() public syncWorklog$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.SYNC_WORKLOG)
    .map(prop('payload'))
    .switchMap(this._syncWorklog$.bind(this));

  @Effect() public removeWorklog$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.REMOVE_WORKLOG)
    .map(prop('payload'))
    .switchMap(this._removeWorklog$.bind(this));

  @Effect() public copyWorklog$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.COPY_WORKLOG)
    .map(prop('payload'))
    .withLatestFrom(this._filters$)
    .switchMap(this._copyWorklog$.bind(this));

  private get _account$(): Observable<IAccount> {
    return this._store.select('account', 'account', 'model')
  }

  private get _filters$(): Observable<any> {
    return this._store.select('worklogs', 'filters', 'model');
  }

  constructor(
    private _actions$: Actions,
    private _jiraIssuesService: JiraIssuesService,
    private _store: Store<any>,
  ) {}

  private _fetchIssues$(from: string, to: string, startAt: number) {
    const jql = `worklogDate >= '${from}' AND worklogDate <= '${to}' AND worklogAuthor = currentUser()`;
    const urlQuery = { maxResults: 100, startAt, fields: '' };

    return this._jiraIssuesService.getList(jql, urlQuery)
      .map(toJson);
  }

  private _fetchWorklogs$(key: string) {
    return this._jiraIssuesService
      .getWroklogs(key)
      .map(toJson)
      .withLatestFrom(this._account$)
      .map(([ response, account ]) => ({ ...response, worklogs: response.worklogs.filter(isCurrentUser(account)) }));
  }

  private _fetchWorklogsList$({ issues, filters }) {
    const getWorklogsWithIssue = pipe(getPayload, compareDates(filters.from, filters.to));
    const requests = issues.map(issue => this._fetchWorklogs$(issue.key));

    return requests.length > 0
      ? Observable
          .concat(...getGroupedRequests(requests, 10))
          .bufferCount(requests.length)
          .map((worklogs: any) => getWorklogsWithIssue({ issues, worklogs }))
          .switchMap((worklogs: any) => Observable.of(new worklogsListActions.FetchWorklogsListSuccess(worklogs)))
      : Observable.of(new worklogsListActions.FetchWorklogsListSuccess([]));
  }

  private _fetchWorklogsListIssues$(filters: any) {
    const { from, to } = filters;

    return this._fetchIssues$(from, to, 0)
      .map(({ total, maxResults, startAt, issues }) => ({
        starts: range(1, total / maxResults).map(page => (page * maxResults)),
        issues,
      }))
      .map(({ starts, issues }) => ({
        requests: starts.map((startAt: number) => this._fetchIssues$(from, to, startAt)),
        issues,
      }))
      .switchMap(data => data.requests.length > 0
        ? Observable
            .concat(...data.requests)
            .map(getIssuesProp)
            .startWith(data.issues)
            .bufferCount(data.requests.length + 1)
            .map((groups) => ({ issues: [ ...flatten(groups) ], filters }))
        : Observable.of({ issues: data.issues, filters }),
      )
  }

  private _syncWorklog$(worklog: any) {
    const { SyncWorklogSuccess, SyncWorklogError } = worklogsListActions;
    const { AddError, AddSuccess } = toastMessagesActions;
    const { issueId, id, started, timeSpentSeconds } = worklog;
    const worklogData = { started, timeSpentSeconds };

    return this._jiraIssuesService.putWorklog(issueId, id, worklogData)
      .concatMap(response => [
        new SyncWorklogSuccess(toJson(response)),
        new AddSuccess({ content: 'Your work log has been saved' }),
      ])
      .catch(error => Observable.from([
        new SyncWorklogError(toJson(error)),
        ...toJson(error).errorMessages.map(content => new AddError({ content })),
      ]));
  }

  private _removeWorklog$(data: any): Observable<Action> {
    return this._jiraIssuesService.deleteWorklog(data.issueId, data.id)
      .map(toJson)
      .concatMap((response) => [
        new worklogsListActions.RemoveWorklogSuccess(data.id),
        new toastMessagesActions.AddSuccess({ content: 'work log has been removed' }),
      ])
      .catch((response) => Observable.from([
        new worklogsListActions.RemoveWorklogError(toJson(response)),
        new toastMessagesActions.AddError({ content: getErrorsFromPayload(toJson(response)) }),
      ]));
  }

  private _getAddWorklogRequest(worklog: any): Observable<any> {
    const { issueId, timeSpentSeconds, started } = worklog;
    const startedDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ');

    return this._jiraIssuesService.createWorklog(issueId, {
      timeSpentSeconds, started: startedDate,
    });
  }

  private _copyWorklog$([ worklog, filters ]): Observable<Action> {
    const request$: Observable<any> = this._getAddWorklogRequest(worklog)

    return request$.concatMap(response => [
      new worklogsListActions.CopyWorklogSuccess(response),
      new worklogsListActions.FetchWorklogsList(filters),
    ])
  }
}
