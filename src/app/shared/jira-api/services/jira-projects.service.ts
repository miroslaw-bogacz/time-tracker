import { Injectable } from '@angular/core';
import { JiraService } from './jira.service';
import { Observable } from 'rxjs/';
import { Response } from '@angular/http';
import { GET_PROJECT, GET_PROJECTS } from '../config/jira-urls';

@Injectable()
export class JiraProjectsService {

  constructor(
    private jira: JiraService,
  ) {}

  public getOne(projectId: string): Observable<Response> {
    return this.jira.get(GET_PROJECT, { projectId });
  }

  public getList(): Observable<Response> {
    return this.jira.get(GET_PROJECTS);
  }

}
