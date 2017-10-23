import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { prop, path, find, propEq } from 'ramda';

import * as worklogsListActions from '../actions/worklogs-list.actions';
import * as issuesListActions from '../actions/issues-list.actions';

import { mapIssueToWorklog } from '../helpers/map-issue-to-worklog.helper';
import { JiraIssuesService } from '../../shared/jira-api/services/jira-issues.service';
import { reduceActivitiesToTimeSpent } from '../helpers/reduce-activities.helper';


@Injectable()
export class WorklogsListEffects {
  @Effect() public add$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.ADD)
    .map(prop('payload'))
    .concatMap(this._add.bind(this));

  @Effect() public stop$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.STOP_TRACKING)
    .map((action: any) => new worklogsListActions.Sync(action.payload));

  @Effect() public sync$: Observable<Action> = this._actions$
    .ofType(worklogsListActions.SYNC)
    .map(prop('payload'))
    .withLatestFrom(this._worklogs$)
    .map(([ id, worklogs ]) => find(propEq('id', id), worklogs))
    .switchMap(this._sync.bind(this));

  private get _worklogs$(): Observable<any[]> {
    return this._store.select(path([ 'issues', 'worklogsList', 'model' ]));
  }

  constructor(
    private _actions$: Actions,
    private _store: Store<any>,
    private _jiraIssuesService: JiraIssuesService,
  ) {}

  private _add(issue: any): Action[] {
    const worklog = mapIssueToWorklog(issue);
    return [
      new worklogsListActions.AddSuccess(worklog),
      new worklogsListActions.StartTracking(worklog.id),
    ];
  }

  private _sync(worklog: any): Observable<Action> {
    const { started, activities, id } = worklog;
    const timeSpentSeconds = Math.max(Math.round(reduceActivitiesToTimeSpent(activities) / 1000), 60);
    const data: any = { timeSpentSeconds, started };
    const timeSpent: number = reduceActivitiesToTimeSpent(activities);

    return this._jiraIssuesService.createWorklog(id, data)
      .concatMap(() => [
        new worklogsListActions.SyncSuccess(worklog.id),
        new worklogsListActions.Remove(worklog.id),
        new issuesListActions.UpdateOneTimeSpent({ id: worklog.id, timeSpent: Math.max(timeSpent, 60) }),
      ])
      .catch((error: any) => Observable.from([
        new worklogsListActions.SyncError(error.json()),
        new worklogsListActions.PauseTracking(id),
      ]));
  }
}
