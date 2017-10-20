import { Action } from '@ngrx/store';

export const FETCH_LIST = '[Issues] [Issues list] fetch list';
export const FETCH_LIST_SUCCESS = '[Issues] [Issues list] fetch list success';
export const FETCH_LIST_ERROR = '[Issues] [Issues list] fetch list error';

export const FETCH_MORE_LIST = '[Issues] [Issues list] fetch more list';
export const FETCH_MORE_LIST_SUCCESS = '[Issues] [Issues list] fetch list more success';
export const FETCH_MORE_LIST_ERROR = '[Issues] [Issues list] fetch list more error';

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

export class FetchMoreList implements Action {
  readonly type = FETCH_MORE_LIST;
  constructor(public payload: any) {}
}

export class FetchMoreListSuccess implements Action {
  readonly type = FETCH_MORE_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchMoreListError implements Action {
  readonly type = FETCH_MORE_LIST_ERROR;
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
  | FetchMoreList
  | FetchMoreListSuccess
  | FetchMoreListError
  | UpdateOneTimeSpent;
