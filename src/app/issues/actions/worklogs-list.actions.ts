import { Action } from '@ngrx/store';

export const ADD = '[Issues] [Worklogs list] add work log';
export const ADD_SUCCESS = '[Issues] [Worklogs list] add work log success';

export const REMOVE = '[Issues] [Worklogs list] remove work log';

export const START_TRACKING = '[Issues] [Worklogs list] start tracking time';
export const STOP_TRACKING = '[Issues] [Worklogs list] stop tracking time';
export const PAUSE_TRACKING = '[Issues] [Worklogs list] pause tracking time';
export const RESUME_TRACKING = '[Issues] [Worklogs list] resume tracking time';

export const SYNC = '[Issues] [Worklogs list] sync work log with jira';
export const SYNC_SUCCESS = '[Issues] [Worklogs list] sync work log with jira success';
export const SYNC_ERROR = '[Issues] [Worklogs list] sync work log with jira error';

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: any) {}
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: any) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public payload: any) {}
}

export class StartTracking implements Action {
  readonly type = START_TRACKING;
  constructor(public payload: string) {}
}

export class StopTracking implements Action {
  readonly type = STOP_TRACKING;
  constructor(public payload: string) {}
}

export class PauseTracking implements Action {
  readonly type = PAUSE_TRACKING;
  constructor(public payload: string) {}
}

export class ResumeTracking implements Action {
  readonly type = RESUME_TRACKING;
  constructor(public payload: string) {}
}

export class Sync implements Action {
  readonly type = SYNC;
  constructor(public payload: any) {}
}

export class SyncSuccess implements Action {
  readonly type = SYNC_SUCCESS;
  constructor(public payload: any) {}
}

export class SyncError implements Action {
  readonly type = SYNC_ERROR;
  constructor(public payload: any) {}
}

export type WorklogsListActions =
  Add
  | AddSuccess
  | Remove
  | StartTracking
  | StopTracking
  | PauseTracking
  | ResumeTracking
  | Sync
  | SyncSuccess
  | SyncError;
