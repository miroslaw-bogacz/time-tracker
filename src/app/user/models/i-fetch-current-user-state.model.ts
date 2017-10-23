import { IUser } from './i-user.model';

export interface IFetchCurrentUserState {
  error: any | null;
  isPending: boolean;
  model: IUser | null;
}
