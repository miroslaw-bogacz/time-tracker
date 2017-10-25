import { Injectable } from '@angular/core';
import { JiraService } from './jira.service';
import {
  CREATE_ISSUE_WORKLOG, DELETE_ISSUE_WORKLOG, GET_ISSUE, GET_ISSUE_WORKLOG, GET_ISSUE_WORKLOGS, GET_ISSUES,
  PUT_ISSUE_WORKLOG,
} from '../config/jira-urls';
import { Observable } from 'rxjs/';
import { Response } from '@angular/http';

@Injectable()
export class JiraIssuesService {

  constructor(
    private jira: JiraService,
  ) {}

  public getOne(issueId: string): Observable<Response> {
    return this.jira.get(GET_ISSUE, { issueId });
  }

  public getList(jqlQuery: string = '', urlQuery: any = {}): Observable<Response> {
    return this.jira.get(GET_ISSUES, null, jqlQuery, urlQuery);
  }

  public getWorklog(issueId: string, worklogId: string): Observable<Response> {
    return this.jira.get(GET_ISSUE_WORKLOG, { issueId, worklogId });
  }

  public putWorklog(issueId: string, worklogId: string, worklogData: any): Observable<Response> {
    return this.jira.put(PUT_ISSUE_WORKLOG, { issueId, worklogId }, worklogData);
  }

  public createWorklog(issueId: string, data: any): Observable<Response> {
    return this.jira.post(CREATE_ISSUE_WORKLOG, { issueId }, data);
  }

  public deleteWorklog(issueId: string, worklogId: string): Observable<Response> {
    return this.jira.delete(DELETE_ISSUE_WORKLOG, { issueId, worklogId });
  }

  public getWroklogs(issueId: string, jqlQuery: string = '', urlQuery: any = {}): Observable<Response> {
    return this.jira.get(GET_ISSUE_WORKLOGS, { issueId }, jqlQuery, urlQuery);
  }

}
