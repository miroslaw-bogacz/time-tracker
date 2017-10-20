import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { prop, path } from 'ramda';

import { JiraIssuesService } from '../../shared/jira-api/services/jira-issues.service';
import * as issuesListActions from '../actions/issues-list.actions';

const filterByProject = (project): string =>
  !!project ? `AND project = "${project}"` : '';

const filterByIssuesKeys = (parentsKeys): string =>
  !!parentsKeys ? `AND issueKey in (${parentsKeys})` : '';

function filterByKeywords (keywords: string) {
  const keywordsMatch = (keywords || '').match(/^([a-zA-Z]+-[0-9]+|)((\s|).*?)$/);
  const summary = !!keywordsMatch[2] ? `summary ~ "${keywordsMatch[2]}*"` : '';
  const key = !!keywordsMatch[1] ? `key = "${keywordsMatch[1]}"` : '';
  const keyAndSummary = key || summary ? `AND ${key || summary}` : '';

  return !!keywords ? keyAndSummary : '';
}

const filtersBy = (filters) =>
  filterByProject(filters.project)
  + filterByIssuesKeys(filters.parentsKeys)
  + filterByKeywords(filters.keywords);


@Injectable()
export class IssuesListEffects {
  @Effect() public fetchList$: Observable<Action> = this._actions$
    .ofType(issuesListActions.FETCH_LIST)
    .map(prop('payload'))
    .switchMap(this._fetchList.bind(this));

  @Effect() public fetchMoreList$: Observable<Action> = this._actions$
    .ofType(issuesListActions.FETCH_MORE_LIST)
    .map(prop('payload'))
    .withLatestFrom(this._store.select(path([ 'issues', 'issuesList', 'model' ])))
    .switchMap(this._fetchMoreList.bind(this));

  constructor(
    private _actions$: Actions,
    private _jiraIssuesService: JiraIssuesService,
    private _store: Store<any>,
  ) {}

  private _fetchIssues(filters: any, page?: any): Observable<any> {
    return this._jiraIssuesService.getList(
      `status NOT in("done") ${filtersBy(filters)}`,
      { maxResults: 100, expand: 'parent,parent.timespent', ...page },
    )
      .map((response: any) => response.json());
  }

  private _fetchMoreList([ filters, issues ]): Observable<Action> {
    const { startAt, maxResults, total } = issues;
    const nextStartAt = Math.min(startAt + maxResults + 1, total);

    return this._fetchIssues(filters, { startAt: nextStartAt })
      .map((response: any) => new issuesListActions.FetchMoreListSuccess(response))
      .catch((error: any) => Observable.of(new issuesListActions.FetchMoreListError([ error ])));
  }

  private _fetchList(payload: any): Observable<Action> {
    return this._fetchIssues(payload)
      .map((response: any) => new issuesListActions.FetchListSuccess(response))
      .catch((error: any) => Observable.of(new issuesListActions.FetchListError([ error ])));
  }
}
