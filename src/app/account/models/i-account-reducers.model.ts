import { ICreateAccountState } from './i-create-account-state.model';
import { IAccountState } from './i-account-state.model';

export interface IAccountReducers {
  createAccount: ICreateAccountState;
  account: IAccountState;
}
