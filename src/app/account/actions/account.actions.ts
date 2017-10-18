import { Action } from '@ngrx/store';

export const UPDATE = '[Account] update account';

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: any) {}
}

export type AccountActions =
  Update;
