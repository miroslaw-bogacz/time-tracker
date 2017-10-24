import { Action } from '@ngrx/store';
import { IAccount } from '../models/i-account.model';

export const UPDATE = '[Account] update account';
export const LOGOUT = '[Account] logout';

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: IAccount) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AccountActions =
  Update
  | Logout;
