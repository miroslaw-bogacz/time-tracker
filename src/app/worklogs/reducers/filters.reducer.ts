import { IFiltersState } from '../models/i-filters-state.model';
import * as filtersActions from '../actions/filters.actions';
const initialState: IFiltersState = {
  model: {},
};

export function filtersReducer(
  state: IFiltersState = initialState,
  action: filtersActions.FiltersActions,
) {
  switch (action.type) {
    case filtersActions.UPDATE:
      return { ...state, model: { ...state.model, ...action.payload } };

    default:
      return state;
  }
}

