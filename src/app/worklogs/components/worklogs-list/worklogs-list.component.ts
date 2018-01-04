import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { path, groupBy, equals, complements, pipe, pluck, sum, multiply } from 'ramda';
import * as moment from 'moment';

import * as worklogsListActions from '../../actions/worklogs-list.actions';
import { formatTimeSpent } from '../../../core/helpers/format-time-spent.helper';

const reduceTimesSpent = (worklogs: any) =>
  formatTimeSpent(worklogs.reduce((acc, worklog) => acc += worklog.timeSpentSeconds, 0) * 1000);

function createGroup(worklogs) {
  return (acc, key) => ([
    ...acc, { group: { day: key, timeSpent: reduceTimesSpent(worklogs[key]) }, worklogs: worklogs[key] },
  ]);
}

@Component({
  selector: 'wl-worklogs-list',
  templateUrl: './worklogs-list.component.html',
  styleUrls: [ './worklogs-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorklogsListComponent implements OnInit {

  public worklogsList$: Observable<any[]>;

  public worklogsListGrouped$: Observable<any[]>;

  public groupedTimeSpent$: Observable<string>;

  public isPending$: Observable<boolean>;

  private filters$: Observable<any>;

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    this.filters$ = this._store.select(path([ 'worklogs', 'filters', 'model' ]));

    this.filters$
      .filter((filters) => filters.from && filters.to)
      .distinctUntilChanged(equals)
      .map((filters: any) => new worklogsListActions.FetchWorklogsList(filters))
      .subscribe((action: any) => this._store.dispatch(action));

    this.worklogsList$ = this._store.select(path([ 'worklogs', 'worklogsList', 'model' ]))
      .filter(Boolean);

    this.worklogsListGrouped$ = this.worklogsList$
      .map(groupBy((worklog: any) => moment(worklog.started).format('dddd, LL')))
      .map(worklogs => Object.keys(worklogs).reduce(createGroup(worklogs), []));

    this.groupedTimeSpent$ = this.worklogsList$
      .map(pipe(pluck('timeSpentSeconds'), sum, multiply(1000), formatTimeSpent));

    this.isPending$ = this._store.select(path([ 'worklogs', 'worklogsList', 'isPending' ]));
  }

  public onSaveClick(worklog: any): void {
    this._store.dispatch(new worklogsListActions.SyncWorklog(worklog));
  }

  public onRemoveClick(data: any): void {
    this._store.dispatch(new worklogsListActions.RemoveWorklog(data))
  }

  public onCopyClick(worklog: any): void {
    const { issueId, started, timeSpentSeconds } = worklog;
    this._store.dispatch(new worklogsListActions.CopyWorklog({ issueId, started, timeSpentSeconds }));
  }

}
