import { ActionReducerMap } from '@ngrx/store';
import { IWorklogsReducers } from '../models/i-worklogs-reducers.model';
import { filtersReducer } from './filters.reducer';
import { worklogsListReducer } from './worklogs-list.reducer';

export const worklogsReducers: ActionReducerMap<IWorklogsReducers> = {
  filters: filtersReducer,
  worklogsList: worklogsListReducer,
};
