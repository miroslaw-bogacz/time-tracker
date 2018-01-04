import { Action } from '@ngrx/store';

export const FETCH_WORKLOGS_LIST = '[Worklogs] [Worklogs list] fetch worklogs list';
export const FETCH_WORKLOGS_LIST_SUCCESS = '[Worklogs] [Worklogs list] fetch worklogs list success';
export const FETCH_WORKLOGS_LIST_ERROR = '[Worklogs] [Worklogs list] fetch worklogs list error';

export const SYNC_WORKLOG = '[Worklogs] [Worklogs list] sync worklog';
export const SYNC_WORKLOG_SUCCESS = '[Worklogs] [Worklogs list] sync worklog success';
export const SYNC_WORKLOG_ERROR = '[Worklogs] [Worklogs list] sync worklog error';

export const REMOVE_WORKLOG = '[Worklogs] [Worklogs list] remove worklog';
export const REMOVE_WORKLOG_SUCCESS = '[Worklogs] [Worklogs list] remove worklog success';
export const REMOVE_WORKLOG_ERROR = '[Worklogs] [Worklogs list] remove worklog error';

export const COPY_WORKLOG = '[Worklogs] [Worklogs list] copy worklog';
export const COPY_WORKLOG_SUCCESS = '[Worklogs] [Worklogs list] copy worklog success';
export const COPY_WORKLOG_ERROR = '[Worklogs] [Worklogs list] copy worklog error';

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

export class RemoveWorklog implements Action {
  readonly type = REMOVE_WORKLOG;
  constructor(public payload: string) {}
}

export class RemoveWorklogSuccess implements Action {
  readonly type = REMOVE_WORKLOG_SUCCESS;
  constructor(public payload: string) {}
}

export class RemoveWorklogError implements Action {
  readonly type = REMOVE_WORKLOG_ERROR;
  constructor(public payload: any) {}
}

export class CopyWorklog implements Action {
  readonly type = COPY_WORKLOG;
  constructor(public payload: any) {}
}

export class CopyWorklogSuccess implements Action {
  readonly type = COPY_WORKLOG_SUCCESS;
  constructor(public payload: any) {}
}

export class CopyWorklogError implements Action {
  readonly type = COPY_WORKLOG_ERROR;
  constructor(public payload: any) {}
}

export type WorklogsListActions =
  FetchWorklogsList
  | FetchWorklogsListSuccess
  | FetchWorklogsListError
  | SyncWorklog
  | SyncWorklogSuccess
  | SyncWorklogError
  | RemoveWorklog
  | RemoveWorklogSuccess
  | RemoveWorklogError
  | CopyWorklog
  | CopyWorklogSuccess
  | CopyWorklogError;
