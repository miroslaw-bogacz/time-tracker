import { Action } from '@ngrx/store';

export const FETCH_LIST = '[Issues] [Issues list] fetch list';
export const FETCH_LIST_SUCCESS = '[Issues] [Issues list] fetch list success';
export const FETCH_LIST_ERROR = '[Issues] [Issues list] fetch list error';

export const FETCH_PARENTS_LIST = '[Issues] [Issues list] fetch parents list';
export const FETCH_PARENTS_LIST_SUCCESS = '[Issues] [Issues list] fetch parents list success';
export const FETCH_PARENTS_LIST_ERROR = '[Issues] [Issues list] fetch parents list error';

export const UPDATE_ONE_TIME_SPENT = '[Issues] [Issues list] update one';

export class FetchList implements Action {
  readonly type = FETCH_LIST;
  constructor(public payload: any) {}
}

export class FetchListSuccess implements Action {
  readonly type = FETCH_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchListError implements Action {
  readonly type = FETCH_LIST_ERROR;
  constructor(public payload: any) {}
}

export class FetchParentsList implements Action {
  readonly type = FETCH_PARENTS_LIST;
  constructor(public payload: any) {}
}

export class FetchParentsListSuccess implements Action {
  readonly type = FETCH_PARENTS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchParentsListError implements Action {
  readonly type = FETCH_PARENTS_LIST_ERROR;
  constructor(public payload: any) {}
}

export class UpdateOneTimeSpent implements Action {
  readonly type = UPDATE_ONE_TIME_SPENT;
  constructor(public payload: any) {}
}

export type IssuesListActions =
  FetchList
  | FetchListSuccess
  | FetchListError
  | FetchParentsList
  | FetchParentsListSuccess
  | FetchParentsListError
  | UpdateOneTimeSpent;
