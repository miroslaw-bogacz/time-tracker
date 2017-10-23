import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { path, prop } from 'ramda';

import * as projectsListActions from '../../actions/projects-list.actions';

@Component({
  selector: 'is-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: [ './projects-list.component.scss' ],
})
export class ProjectsListComponent implements OnInit {

  public isPending$: Observable<boolean>;

  public isError$: Observable<boolean>;

  public projectsList$: Observable<any>;

  private _projectsListState$: Observable<any>;

  constructor(
    private _store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this._projectsListState$ = this._store.select(path([ 'issues', 'projectsList' ]));
    this.isPending$ = this._projectsListState$.map(prop('isPending'));
    this.isError$ = this._projectsListState$.map(prop('isError'));
    this.projectsList$ = this._projectsListState$.map(prop('model'));

    this._store.dispatch(new projectsListActions.FetchList());
  }

  public onChangeProject(projectKey: string): void {
    this._store.dispatch(new projectsListActions.ChangeProject(projectKey));
  }

  public trackByKey(index: number, item: any): string {
    return item.key;
  }

}
