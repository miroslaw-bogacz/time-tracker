import { pathOr } from 'ramda';

import { IWorklogsListState } from '../models/i-worklogs-list-state.model';
import * as worklogsListActions from '../actions/worklogs-list.actions';
import { getErrorsFromPayload } from '../../core/helpers/get-errors-from-payload';

const mergeSyncWorklog = (payload) =>
  (worklog) => worklog.id === payload.id
    ? { ...payload, issueId: worklog.issueId, issue: worklog.issue }
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
    case worklogsListActions.FETCH_WORKLOGS_LIST:
      return { ...state, isPending: true, isError: false, model: [], errors: [] };

    case worklogsListActions.FETCH_WORKLOGS_LIST_SUCCESS:
      return { ...state, isPending: false, model: action.payload };

    case worklogsListActions.FETCH_WORKLOGS_LIST_ERROR:
      return { ...state, isPending: false, isError: true, errors: getErrorsFromPayload(action.payload) };

    case worklogsListActions.SYNC_WORKLOG:
      return { ...state, isPending: true, isError: false, errors: [] };

    case worklogsListActions.SYNC_WORKLOG_SUCCESS:
      return { ...state, isPending: false, model: state.model.map(mergeSyncWorklog(action.payload)) };

    case worklogsListActions.SYNC_WORKLOG_ERROR:
      return { ...state, isPending: false, isError: true, errors: getErrorsFromPayload(action.payload) };

    default:
      return state;
  }
}
