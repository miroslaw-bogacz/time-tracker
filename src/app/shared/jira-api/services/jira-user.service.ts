import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/';

import { JiraService } from './jira.service';
import { GET_CURRENT_USER } from './../config/jira-urls';

@Injectable()
export class JiraUserService {

  constructor(
    private jiraServ: JiraService,
  ) {}

  public getCurrentUser(): Observable<Response> {
    return this.jiraServ.get(GET_CURRENT_USER);
  }

}
