import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { path, groupBy } from 'ramda';
import * as moment from 'moment';

import * as worklogsListActions from '../../actions/worklogs-list.actions';

@Component({
  selector: 'wl-worklogs-list',
  templateUrl: './worklogs-list.component.html',
  styleUrls: [ './worklogs-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorklogsListComponent implements OnInit {

  public worklogsList$: Observable<any[]>;

  public isPending$: Observable<boolean>;

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    this._store.select(path([ 'worklogs', 'filters', 'model' ]))
      .filter((filters) => filters.from && filters.to)
      .map((filters: any) => new worklogsListActions.FetchWorklogsList(filters))
      .subscribe((action: any) => this._store.dispatch(action));

    this.worklogsList$ = this._store.select(path([ 'worklogs', 'worklogsList', 'model' ]))
      .filter(Boolean)
      .map(groupBy((worklog: any) => moment(worklog.started).format('LL')))
      .map(
        worklogs =>
          Object.keys(worklogs).reduce((acc, key) => [ ...acc, { group: key, worklogs: worklogs[key] } ], []),
      );

    this.isPending$ = this._store.select(path([ 'worklogs', 'worklogsList', 'isPending' ]))
      .select((state) => state.history.historyList.pending);
  }

  public onSaveClick(worklog: any): void {
    this._store.dispatch(new worklogsListActions.SyncWorklog(worklog));
  }

}
