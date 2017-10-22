import { Action } from '@ngrx/store';

import { IUser } from './../models/i-user.model';
import { IServerError } from './../models/i-server-error.model';

export const FETCH_CURRENT_USER = `[User] fetch current user`;
export const FETCH_CURRENT_USER_SUCCESS = `${FETCH_CURRENT_USER} success`;
export const FETCH_CURRENT_USER_ERROR = `${FETCH_CURRENT_USER} error`;

export class FetchCurrentUser implements Action {
  readonly type = FETCH_CURRENT_USER;
}

export class FetchCurrentUserSuccess implements Action {
  readonly type = FETCH_CURRENT_USER_SUCCESS;
  constructor(public payload: IUser) {}
}

export class FetchCurrentUserError implements Action {
  readonly type = FETCH_CURRENT_USER_ERROR;
  constructor(public payload: IServerError) {}
}

export type UserActions =
  | FetchCurrentUser
  | FetchCurrentUserSuccess
  | FetchCurrentUserError
;
