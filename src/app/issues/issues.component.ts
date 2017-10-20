import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { path } from 'ramda';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'is-issues',
  templateUrl: './issues.component.html',
  styleUrls: [ './issues.component.scss' ],
})
export class IssuesComponent implements OnInit {

  public isPending$: Observable<boolean>;

  public scrolled$: Subject<null> = new Subject();

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    const projectsListIsPending$: Observable<boolean> = this._store
      .select(path([ 'issues', 'projectsList', 'isPending' ]));

    const issuesListIsPending$: Observable<boolean> = this._store
      .select(path([ 'issues', 'issuesList', 'isPending' ]));

    this.isPending$ = Observable.merge(projectsListIsPending$, issuesListIsPending$)
      .distinctUntilChanged();
  }

}
