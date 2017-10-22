import { MicroReducer } from './../../../core/helpers/combine-micro-reducers.helper';
import { IFetchCurrentUserState } from '../../models/i-fetch-current-user-state.model';
import { TFetchCurrentUserReducer } from '../../models/t-fetch-current-user-reducer.model';
import { FetchCurrentUserSuccess, FETCH_CURRENT_USER_SUCCESS } from '../../actions/user.actions';

export const fetchCurrentUserSuccess: MicroReducer<TFetchCurrentUserReducer> = {
  [FETCH_CURRENT_USER_SUCCESS](state: IFetchCurrentUserState, action: FetchCurrentUserSuccess): IFetchCurrentUserState {
    return {
      error: null,
      isPending: false,
      model: action.payload,
    };
  },
};
