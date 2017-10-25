import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { pipe } from 'ramda';

import { JiraRequestOptionsService } from './jira-request-options.service';
import { jiraReduceUrlData } from '../helpers/jira-reduce-url-data';
import { jiraReduceUrlQuery } from '../helpers/jira-reduce-url-query';
import { jiraReduceUrlJql } from '../helpers/jira-reduce-url-jql';

function parseUrl(urlData, jqlQuery, urlQuery) {
  return pipe(
    jiraReduceUrlData(urlData),
    jiraReduceUrlJql(jqlQuery),
    jiraReduceUrlQuery(urlQuery),
  );
}

@Injectable()
export class JiraService {

  constructor(
    private jiraRequestOptions: JiraRequestOptionsService,
    private http: Http,
  ) {}

  public get requestOptions(): RequestOptionsArgs {
    const options: RequestOptions = new RequestOptions();
    const headers: Headers = new Headers();

    headers.set('Authorization', `Basic ${this.jiraRequestOptions.token}`);
    options.headers = headers;

    return options;
  }

  public get(type: string, urlData?: any, jqlQuery: string = '', urlQuery: any = {}): Observable<Response> {
    return this.http.get(this.url(type, urlData, jqlQuery, urlQuery), this.requestOptions);
  }

  public delete(type: string, urlData?: any, jqlQuery: string = '', urlQuery: any = {}): Observable<Response> {
    return this.http.delete(this.url(type, urlData, jqlQuery, urlQuery), this.requestOptions);
  }

  public post(type: string, urlData: any, postData: any): Observable<Response> {
    return this.http.post(this.url(type, urlData), postData, this.requestOptions);
  }

  public put(type: string, urlData: any, postData: any): Observable<Response> {
    return this.http.put(this.url(type, urlData), postData, this.requestOptions);
  }

  private url(type: string, urlData?: any, jqlQuery?: string, urlQuery?: any): string {
    const url: string = this.jiraRequestOptions.url;
    const uri: string = parseUrl(urlData, jqlQuery, urlQuery)(type);

    return `${url}/${uri}`
      .replace(/({.*?})/g, '')
      .replace(/(?:\?jql=$)/, '')
      .replace(/(?:\?$)/, '');
  }

}
