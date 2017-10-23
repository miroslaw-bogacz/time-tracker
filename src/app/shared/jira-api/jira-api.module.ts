import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  JiraService, JiraRequestOptionsService, JiraUserService,
  JiraIssuesService, JiraProjectsService,
} from './services';
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
    JiraUserService,
  ],
})
export class JiraApiModule { }
