import { Action } from '@ngrx/store';

export const FETCH_LIST = '[Issues] [Projects List] fetch list';
export const FETCH_LIST_SUCCESS = '[Issues] [Projects List] fetch list success';
export const FETCH_LIST_ERROR = '[Issues] [Projects List] fetch list error';

export const CHANGE_PROJECT = '[Issues] [Projects List] change project';

export class FetchList implements Action {
  readonly type = FETCH_LIST;
}

export class FetchListSuccess implements Action {
  readonly type = FETCH_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchListError implements Action {
  readonly type = FETCH_LIST_ERROR;
  constructor(public payload: any) {}
}

export class ChangeProject implements Action {
  readonly type = CHANGE_PROJECT;
  constructor(public payload: string) {}
}

export type ProjectsListActions =
  FetchList
  | FetchListSuccess
  | FetchListError
  | ChangeProject;
