import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as projectsListActions from '../actions/projects-list.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { JiraProjectsService } from '../../shared/jira-api/services/jira-projects.service';

function changeFetchListResponse(response: any) {
  return response.map(
    (project: any) =>
      ({ key: project.key, name: project.name, avatarUrls: project.avatarUrls, isSelected: false }),
  );
}

@Injectable()
export class ProjectsListEffects {
  @Effect() public fetchList$ = this._actions
    .ofType(projectsListActions.FETCH_LIST)
    .switchMap(this._fetchList.bind(this));

  constructor(
    private _actions: Actions,
    private _jiraProjectsService: JiraProjectsService,
  ) {}

  private _fetchList(): Observable<Action> {
    return this._jiraProjectsService.getList()
      .map((response: any) => changeFetchListResponse(response.json()))
      .map((projects: any) => new projectsListActions.FetchListSuccess(projects))
      .catch(error => Observable.of(new projectsListActions.FetchListError(error)));
  }
}
