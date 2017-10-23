import { MicroReducer } from './../../../core/helpers/combine-micro-reducers.helper';
import { IFetchCurrentUserState } from '../../models/i-fetch-current-user-state.model';
import { TFetchCurrentUserReducer } from '../../models/t-fetch-current-user-reducer.model';
import { FetchCurrentUserError, FETCH_CURRENT_USER_ERROR } from '../../actions/user.actions';

export const fetchCurrentUserError: MicroReducer<TFetchCurrentUserReducer> = {
  [FETCH_CURRENT_USER_ERROR](state: IFetchCurrentUserState, action: FetchCurrentUserError): IFetchCurrentUserState {
    return {
      error: action.payload,
      isPending: false,
      model: state.model,
    };
  },
};
