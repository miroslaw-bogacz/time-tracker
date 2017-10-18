import * as createAccountActions from '../actions/create-account.actions';
import { ICreateAccountState } from '../models/i-create-account-state.model';

const initialState: ICreateAccountState = {
  isPending: false,
  isError: false,
  errors: null,
};

export function createAccountReducer(
  state: ICreateAccountState = initialState,
  action: createAccountActions.CreateAccountActions,
) {
  switch (action.type) {
    case createAccountActions.VERIFICATION_ACCOUNT:
      return { ...state, isPending: true, isError: false, errors: null };

    case createAccountActions.VERIFICATION_ACCOUNT_SUCCESS:
      return { ...state, isPending: false, isError: false, errors: null };

    case createAccountActions.VERIFICATION_ACCOUNT_ERROR:
      return { ...state, isPending: false, isError: true, errors: action.payload };

    default:
      return state;
  }
}
