import { IProjectsListState } from './i-projects-list-state.model';
import { IIssuesListState } from './i-issues-list-state.model';
import { IFiltersState } from './i-filters-state.model';
import { IWorklogsListState } from './i-worklogs-list-state.model';

export interface IIssuesReducers {
  projectsList: IProjectsListState;
  issuesList: IIssuesListState;
  filters: IFiltersState;
  worklogsList: IWorklogsListState;
}
