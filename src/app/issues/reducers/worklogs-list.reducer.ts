import { IWorklogsListState } from '../models/i-worklogs-list-state.model';
import { complement, propEq } from 'ramda';

import * as worklogsListActions from '../actions/worklogs-list.actions';
import * as worklogStatues from '../helpers/configs/worklog-statuses.config';
import { getErrorsFromPayload } from '../../core/helpers/get-errors-from-payload';

const createActivity = () => ({ start: new Date().getTime(), stop: null, spent: null });

const stopActivity = (activity: any) => {
  const currentTime = new Date().getTime();

  return { ...activity, stop: currentTime, spent: currentTime - activity.start }
};

const startTracking = (id: string): any =>
  (worklog: any) => worklog.id === id
    ? ({
      ...worklog,
      activities: [ ...worklog.activities, createActivity() ],
      status: worklogStatues.TRACKED,
    })
    : worklog;

const stopTracking = (id: string): any =>
  (worklog: any) => worklog.id === id
    ? ({
        ...worklog,
        activities: worklog.activities.map((activity: any) => activity.stop === null ? stopActivity(activity) : activity),
        status: worklogStatues.STOPPED,
      })
    : worklog;

const pauseTracking = (id: string): any =>
  (worklog: any) => worklog.id === id
    ? ({
        ...worklog,
        activities: worklog.activities.map((activity: any) => activity.stop === null ? stopActivity(activity) : activity),
        status: worklogStatues.PAUSED,
      })
    : worklog;

const initialState: IWorklogsListState = {
  isPending: false,
  isError: false,
  model: [],
  errors: [],
};

export function worklogsListReducer(
  state: IWorklogsListState = initialState,
  action: worklogsListActions.WorklogsListActions,
) {
  switch (action.type) {
    case worklogsListActions.ADD_SUCCESS:
      return { ...state, model: [ ...state.model, action.payload ] };

    case worklogsListActions.REMOVE:
      return { ...state, model: [ ...state.model.filter(complement(propEq('id', action.payload))) ] };

    case worklogsListActions.START_TRACKING:
    case worklogsListActions.RESUME_TRACKING:
      return {
        ...state,
        model: state.model
          .map((worklog: any) => pauseTracking(worklog.id)(worklog))
          .map(startTracking(action.payload)),
      };

    case worklogsListActions.STOP_TRACKING:
      return { ...state, model: state.model.map(stopTracking(action.payload)) };

    case worklogsListActions.PAUSE_TRACKING:
      return { ...state, model: state.model.map(pauseTracking(action.payload)) };

    case worklogsListActions.SYNC:
      return { ...state, isPending: true };

    case worklogsListActions.SYNC_SUCCESS:
      return { ...state, isPending: false, isError: false, errors: [] };

    case worklogsListActions.SYNC_ERROR:
      return { ...state, isPending: false, isError: true, errors: getErrorsFromPayload(action.payload) };

    default:
      return state;
  }
}
