import { UserActions } from '../actions/user.actions';
import { IFetchCurrentUserState } from './i-fetch-current-user-state.model';

export type TFetchCurrentUserReducer = (state: IFetchCurrentUserState, action: UserActions) => IFetchCurrentUserState;
