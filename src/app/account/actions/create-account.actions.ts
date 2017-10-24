import { Action } from '@ngrx/store';
import { IAccount } from '../models/i-account.model';

export const VERIFICATION_ACCOUNT = '[Create Account] verification account';
export const VERIFICATION_ACCOUNT_SUCCESS = '[Create Account] verification account success';
export const VERIFICATION_ACCOUNT_ERROR = '[Create Account] verification account error';

export class VerificationAccount implements Action {
  readonly type = VERIFICATION_ACCOUNT;
  constructor(public payload: IAccount) {}
}

export class VerificationAccountSuccess implements Action {
  readonly type = VERIFICATION_ACCOUNT_SUCCESS;
}

export class VerificationAccountError implements Action {
  readonly type = VERIFICATION_ACCOUNT_ERROR;
  constructor(public payload: any) {}
}

export type CreateAccountActions =
  | VerificationAccount
  | VerificationAccountSuccess
  | VerificationAccountError;
