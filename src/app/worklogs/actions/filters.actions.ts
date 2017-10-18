import { Action } from '@ngrx/store';

export const UPDATE = '[Worklogs] [filters] update';

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: any) {}
}

export type FiltersActions = Update;
