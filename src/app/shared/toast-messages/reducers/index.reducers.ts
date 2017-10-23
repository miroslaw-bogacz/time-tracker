import { ActionReducerMap } from '@ngrx/store';
import { IToastMessagesReducers } from '../models/i-toast-messages-reducers.model';
import { toastMessagesListReducer } from './toast-messages.reducer';

export const toastMessagesReducers: ActionReducerMap<IToastMessagesReducers> = {
  toastMessagesList: toastMessagesListReducer,
};
