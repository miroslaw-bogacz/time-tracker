import { projectsListReducer } from './projects-list.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IIssuesReducers } from '../models/i-issues-reducers.model';
import { issuesListReducer } from './issues-list.reducer';
import { filtersReducer } from './filters.reducer';
import { worklogsListReducer } from './worklogs-list.reducer';

export const issuesReducers: ActionReducerMap<IIssuesReducers> = {
  projectsList: projectsListReducer,
  issuesList: issuesListReducer,
  filters: filtersReducer,
  worklogsList: worklogsListReducer,
};
