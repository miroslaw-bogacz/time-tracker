import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { path, propOr, flatten, find, propEq, prop, complement, isEmpty, not } from 'ramda';
import { Observable } from 'rxjs/Observable';

import * as issuesListActions from '../../actions/issues-list.actions';
import * as worklogsListActions from '../../actions/worklogs-list.actions';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'is-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: [ './issues-list.component.scss' ],
})
export class IssuesListComponent implements OnInit, OnDestroy {

  @Input() public scrolled: Subject<any>;

  public issuesList$: Observable<any[]>;

  private _currentProject$: Observable<any>;

  private _filters$: Observable<any>;

  private _unsubscribe$: Subject<any> = new Subject();

  constructor(
    private _store: Store<any>,
  ) { }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  public ngOnInit(): void {
    const isPending$ = this._store.select(path([ 'issues', 'issuesList', 'isPending' ]));
    this.issuesList$ = this._store.select(path([ 'issues', 'issuesList', 'model', 'issues' ]));

    this._currentProject$ = this._store
      .select(path([ 'issues', 'projectsList', 'model' ]))
      .map(find(propEq('isSelected', true)))
      .filter(Boolean);

    this._filters$ = this._store.select(path([ 'issues', 'filters', 'model' ]));

    this._currentProject$
      .startWith(null)
      .combineLatest(this._filters$)
      .map(([ project, filters ]) => ({ project: propOr(null, 'key', project), ...filters }))
      .takeUntil(this._unsubscribe$)
      .subscribe((filters: any) => this._store.dispatch(new issuesListActions.FetchList(filters)));

    this.scrolled
      .debounceTime(300)
      .withLatestFrom(isPending$.filter(not), this._currentProject$.startWith(null), this._filters$)
      .map(([ _, isPending, project, filters ]) => ({ project: propOr(null, 'key', project), ...filters }))
      .takeUntil(this._unsubscribe$)
      .subscribe((filters: any) => this._store.dispatch(new issuesListActions.FetchMoreList(filters)));
  }

  public onStartTimeSpent(issue): void {
    this._store.dispatch(new worklogsListActions.Add(issue));
  }

}
