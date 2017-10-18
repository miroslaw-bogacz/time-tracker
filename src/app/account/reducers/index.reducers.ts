import { createAccountReducer } from './create-account.reducer';
import { accountReducer } from './account.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IAccountReducers } from '../models/i-account-reducers.model';

export const accountReducers: ActionReducerMap<IAccountReducers> = {
  account: accountReducer,
  createAccount: createAccountReducer,
};
