import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { prop } from 'ramda';

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

  @Effect() public _fetchParentsList$: Observable<Action> = this._actions$
    .ofType(issuesListActions.FETCH_PARENTS_LIST)
    .map(prop('payload'))
    .switchMap(this._fetchParentsList.bind(this));

  constructor(
    private _actions$: Actions,
    private _jiraIssuesService: JiraIssuesService,
  ) {}

  private _fetchIssues(filters: any): Observable<any> {
    return this._jiraIssuesService.getList(
      `status NOT in("done") ${filtersBy(filters)}`,
      { maxResults: 100, expand: 'parent,parent.timespent' },
    )
      .map((response: any) => response.json());
  }

  private _fetchList(payload: any): Observable<Action> {
    return this._fetchIssues(payload)
      .concatMap((response: any) => [
        new issuesListActions.FetchListSuccess(response),
        new issuesListActions.FetchParentsList(response.issues),
      ])
      .catch((error: any) => Observable.of(new issuesListActions.FetchListError([ error ])));
  }

  private _fetchParentsList(issues: any): Observable<Action> {
    const parentsKeys: string[] = issues
      .filter((issue: any) => issue.fields.parent)
      .map((issue: any) => issue.fields.parent.key);

    return parentsKeys.length > 0
      ? this._fetchIssues({ parentsKeys })
          .map((parents: any) => new issuesListActions.FetchParentsListSuccess({ parents: parents.issues, issues }))
          .catch((error: any) => Observable.of(new issuesListActions.FetchParentsListError([ error ])))
      : Observable.of(new issuesListActions.FetchParentsListSuccess({ issues }));
  }
}
