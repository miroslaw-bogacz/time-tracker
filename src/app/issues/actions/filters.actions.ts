import { Action } from '@ngrx/store';

export const UPDATE = '[Issues] [Filters] update';

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: any) {}
}

export type FiltersActions = Update;
