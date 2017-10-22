import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { handleFor } from '../../core/helpers';
import { JiraUserService } from '../../shared/jira-api/services';
import {
  UserActions,
  FETCH_CURRENT_USER,
  FetchCurrentUserSuccess,
  FetchCurrentUserError,
} from '../actions/user.actions';
import { IUser } from './../models/i-user.model';

@Injectable()
export class UserEffects {

  @Effect() public getCurrentUser$: Observable<UserActions> = this.actions$
    .ofType(FETCH_CURRENT_USER)
    .switchMap(this.getCurrentUserHandler.bind(this));

  constructor(
    private actions$: Actions,
    private jiraUserServ: JiraUserService,
  ) {}

  private getCurrentUserHandler(): Observable<FetchCurrentUserSuccess | FetchCurrentUserError> {
    return this.jiraUserServ
      .getCurrentUser()
      .concatMap(handleFor(FetchCurrentUserSuccess))
      .catch(handleFor(FetchCurrentUserError));
  }

}
