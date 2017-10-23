import { Action } from '@ngrx/store';

export const FETCH_WORKLOGS_LIST = '[Worklogs] [Worklogs list] fetch worklogs list';
export const FETCH_WORKLOGS_LIST_SUCCESS = '[Worklogs] [Worklogs list] fetch worklogs list success';
export const FETCH_WORKLOGS_LIST_ERROR = '[Worklogs] [Worklogs list] fetch worklogs list error';

export const SYNC_WORKLOG = '[Worklogs] [Worklogs list] sync worklog';
export const SYNC_WORKLOG_SUCCESS = '[Worklogs] [Worklogs list] sync worklog success';
export const SYNC_WORKLOG_ERROR = '[Worklogs] [Worklogs list] sync worklog error';

export class FetchWorklogsList implements Action {
  readonly type = FETCH_WORKLOGS_LIST;
  constructor(public payload: any) {}
}

export class FetchWorklogsListSuccess implements Action {
  readonly type = FETCH_WORKLOGS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchWorklogsListError implements Action {
  readonly type = FETCH_WORKLOGS_LIST_ERROR;
  constructor(public payload: any) {}
}

export class SyncWorklog implements Action {
  readonly type = SYNC_WORKLOG;
  constructor(public payload: any) {}
}

export class SyncWorklogSuccess implements Action {
  readonly type = SYNC_WORKLOG_SUCCESS;
  constructor(public payload: any) {}
}

export class SyncWorklogError implements Action {
  readonly type = SYNC_WORKLOG_ERROR;
  constructor(public payload: any) {}
}

export type WorklogsListActions =
  FetchWorklogsList
  | FetchWorklogsListSuccess
  | FetchWorklogsListError
  | SyncWorklog
  | SyncWorklogSuccess
  | SyncWorklogError;
