import uuid from 'uuid/v4';
import { complement, propEq } from 'ramda';

import { IToastMessagesListState } from '../models/i-toast-messages-list-state.model';
import * as toastMessagesListActions from '../actions/toast-messages.actions';

const intitalState: IToastMessagesListState = {
  model: [],
};

const getToastMessage = (payload: any, type: string) => ({ ...payload, type, uuid: uuid() });

export function toastMessagesListReducer(
  state: IToastMessagesListState = intitalState,
  action: toastMessagesListActions.ToastMessagesActions,
) {
  switch (action.type) {
    case toastMessagesListActions.ADD_SUCCESS:
      return { ...state, model: state.model.concat(getToastMessage(action.payload, 'success')) };

    case toastMessagesListActions.ADD_ERROR:
      return { ...state, model: state.model.concat(getToastMessage(action.payload, 'error')) };

    case toastMessagesListActions.REMOVE:
      return { ...state, model: state.model.filter(complement(propEq('uuid', action.payload))) };

    default:
      return state;
  }
}
