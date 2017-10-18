import { IWorklogsListState } from '../models/i-worklogs-list-state.model';
import * as worklogsListActions from '../actions/worklogs-list.actions';

const mergeSyncWorklog = (payload) =>
  (worklog) => worklog.id === payload.id
    ? { ...payload, issueId: worklog.issueId, issue: worklog.issue }
    : worklog;

const initialState: IWorklogsListState = {
  isPending: false,
  isError: false,
  model: [],
};

export function worklogsListReducer(
  state: IWorklogsListState = initialState,
  action: worklogsListActions.WorklogsListActions,
) {
  switch (action.type) {
    case worklogsListActions.FETCH_WORKLOGS_LIST:
      return { ...state, isPending: true, isError: false, model: [] };

    case worklogsListActions.FETCH_WORKLOGS_LIST_SUCCESS:
      return { ...state, isPending: false, model: action.payload };

    case worklogsListActions.FETCH_WORKLOGS_LIST_ERROR:
      return { ...state, isPending: false, isError: true };

    case worklogsListActions.SYNC_WORKLOG:
      return { ...state, isPending: true };

    case worklogsListActions.SYNC_WORKLOG_SUCCESS:
      return { ...state, isPending: false, model: state.model.map(mergeSyncWorklog(action.payload)) };

    default:
      return state;
  }
}
