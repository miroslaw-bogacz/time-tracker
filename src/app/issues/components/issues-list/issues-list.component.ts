import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { path, propOr, flatten, find, propEq, prop, complement, isEmpty } from 'ramda';
import { Observable } from 'rxjs/Observable';

import * as issuesListActions from '../../actions/issues-list.actions';
import * as worklogsListActions from '../../actions/worklogs-list.actions';


@Component({
  selector: 'is-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: [ './issues-list.component.scss' ],
})
export class IssuesListComponent implements OnInit {

  public issuesList$: Observable<any[]>;

  private _currentProject$: Observable<any>;

  private _filters$: Observable<any>;

  constructor(
    private _store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this.issuesList$ = this._store.select(path([ 'issues', 'issuesList', 'model' ]));

    this._currentProject$ = this._store
      .select(path([ 'issues', 'projectsList', 'model' ]))
      .map(find(propEq('isSelected', true)))
      .filter(Boolean);

    this._filters$ = this._store.select(path([ 'issues', 'filters', 'model' ]));

    this._currentProject$
      .startWith(null)
      .combineLatest(this._filters$)
      .map(([ project, filters ]) => ({ project: propOr(null, 'key', project), ...filters }))
      .subscribe((filters: any) => this._store.dispatch(new issuesListActions.FetchList(filters)));
  }

  public onStartTimeSpent(issue): void {
    this._store.dispatch(new worklogsListActions.Add(issue));
  }

}
