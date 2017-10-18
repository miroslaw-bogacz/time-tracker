import { IFiltersState } from './i-filters-state.model';
import { IWorklogsListState } from './i-worklogs-list-state.model';

export interface IWorklogsReducers {
  filters: IFiltersState;
  worklogsList: IWorklogsListState;
}
