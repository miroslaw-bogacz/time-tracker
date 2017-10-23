import { fetchCurrentUserReducer } from './fetch-current-user/index.reducer';
import { IUserReducers } from '../models/i-user-reducers.model';
import { ActionReducerMap } from '@ngrx/store';

export const userReducers: ActionReducerMap<IUserReducers> = {
  fetchCurrentUser: fetchCurrentUserReducer,
};
