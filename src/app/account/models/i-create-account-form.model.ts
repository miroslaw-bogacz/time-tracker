import { IAccount } from './i-account.model';

export interface ICreateAccountForm extends IAccount {
  password: string;
}
