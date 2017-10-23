import { Action } from '@ngrx/store';

export const ADD_SUCCESS = '[Toast messages] add success message';
export const ADD_ERROR = '[Toast messages] add error message';
export const REMOVE = '[Toast messages] remove';

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: any) {}
}

export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: any) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public payload: string) {}
}

export type ToastMessagesActions =
  AddSuccess
  | AddError
  | Remove;
