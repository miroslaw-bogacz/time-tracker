import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraService } from './services/jira.service';
import { JiraRequestOptionsService } from './services/jira-request-options.service';
import { JiraIssuesService } from './services/jira-issues.service';
import { JiraProjectsService } from './services/jira-projects.service';
import { Http, HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],

  declarations: [

  ],

  providers: [
    JiraService,
    JiraRequestOptionsService,
    JiraIssuesService,
    JiraProjectsService,
  ],
})
export class JiraApiModule { }
