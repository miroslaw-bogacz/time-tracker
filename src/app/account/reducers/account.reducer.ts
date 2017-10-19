import * as accountActions from '../actions/account.actions';
import { IAccountState } from '../models/i-account-state.model';

const initialState: IAccountState = {
  model: null,
};

export function accountReducer(state: IAccountState = initialState, action: accountActions.AccountActions) {
  switch (action.type) {
    case accountActions.UPDATE:
      return { ...state, model: action.payload };

    case accountActions.LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
}
