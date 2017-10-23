import { Injectable } from '@angular/core';
import { JiraService } from './jira.service';
import { GET_CURRENT_USER } from '../config/jira-urls';
import { Observable } from 'rxjs/';
import { Response } from '@angular/http';

@Injectable()
export class JiraUserService {

  constructor(
    private jira: JiraService,
  ) {}

  public getCurrentUser(): Observable<Response> {
    return this.jira.get(GET_CURRENT_USER);
  }

}
