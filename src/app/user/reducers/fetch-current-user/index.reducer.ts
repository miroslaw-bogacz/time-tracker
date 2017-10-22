import { combineMicroReducers } from '../../../core/helpers';
import { IFetchCurrentUserState } from '../../models/i-fetch-current-user-state.model';
import { UserActions } from '../../actions/user.actions';
import { fetchCurrentUser } from './fetch-current-user';
import { fetchCurrentUserSuccess } from './fetch-current-user-success';
import { fetchCurrentUserError } from './fetch-current-user-error';

const initialState: IFetchCurrentUserState = {
  error: null,
  isPending: false,
  model: null,
};

const selectReducer = combineMicroReducers(
  fetchCurrentUser,
  fetchCurrentUserSuccess,
  fetchCurrentUserError,
);

export function fetchCurrentUserReducer(state = initialState, action: UserActions): IFetchCurrentUserState {
  const reducer = selectReducer(action.type);
  return reducer(state, action);
}
