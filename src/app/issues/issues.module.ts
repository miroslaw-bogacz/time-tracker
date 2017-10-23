import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { UserModule } from './../user/user.module';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues.component';
import { issuesReducers } from './reducers/index.reducers';
import { JiraApiModule } from '../shared/jira-api/jira-api.module';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsListEffects } from './effects/projects-list.effects';
import { ProjectItemComponent } from './components/projects-list/project-item/project-item.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssuesListEffects } from './effects/issues-list.effects';
import { IssueItemComponent } from './components/issues-list/issue-item/issue-item.component';
import { FiltersComponent } from './components/filters/filters.component';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.component';
import { WorklogItemComponent } from './components/worklogs-list/worklog-item/worklog-item.component';
import { WorklogsListEffects } from './effects/worklogs-list.effects';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IssuesRoutingModule,
    JiraApiModule,
    StoreModule.forFeature('issues', issuesReducers),
    EffectsModule.forFeature([ ProjectsListEffects, IssuesListEffects, WorklogsListEffects ]),
    SpinnerModule,
    InfiniteScrollModule,
    UserModule,
  ],

  declarations: [
    IssuesComponent, ProjectsListComponent, ProjectItemComponent, IssuesListComponent, IssueItemComponent,
    FiltersComponent, WorklogsListComponent, WorklogItemComponent,
  ],
})
export class IssuesModule { }
