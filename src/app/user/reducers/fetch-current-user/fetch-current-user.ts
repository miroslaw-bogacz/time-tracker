import { MicroReducer } from './../../../core/helpers/combine-micro-reducers.helper';
import { IFetchCurrentUserState } from '../../models/i-fetch-current-user-state.model';
import { TFetchCurrentUserReducer } from '../../models/t-fetch-current-user-reducer.model';
import { FetchCurrentUser, FETCH_CURRENT_USER } from '../../actions/user.actions';

export const fetchCurrentUser: MicroReducer<TFetchCurrentUserReducer> = {
  [FETCH_CURRENT_USER](state: IFetchCurrentUserState, action: FetchCurrentUser): IFetchCurrentUserState {
    return {
      error: null,
      isPending: true,
      model: null,
    };
  },
};
