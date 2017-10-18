import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { path } from 'ramda';

import * as worklogsListActions from '../../actions/worklogs-list.actions';

@Component({
  selector: 'is-worklogs-list',
  templateUrl: './worklogs-list.component.html',
  styleUrls: [ './worklogs-list.component.scss' ],
})
export class WorklogsListComponent implements OnInit {

  public worklogsList$: Observable<any[]>;

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    this.worklogsList$ = this._store.select(path([ 'issues', 'worklogsList', 'model' ]));
  }

  public stopTracking(id: string): void {
    this._store.dispatch(new worklogsListActions.StopTracking(id));
  }

  public resumeTracking(id: string): void {
    this._store.dispatch(new worklogsListActions.ResumeTracking(id));
  }

  public pauseTracking(id: string): void {
    this._store.dispatch(new worklogsListActions.PauseTracking(id));
  }

  public trackById(index: number, worklog: any): string {
    return worklog.id;
  }

}
