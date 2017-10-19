import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JiraRequestOptionsService } from './shared/jira-api/services/jira-request-options.service';
import { getHeaderOptionsByAccount } from './core/helpers/get-header-options-by-account.helper';
import { IJiraRequestOptions } from './shared/jira-api/models/jira-request-options.interface';
import * as accountActions from './account/actions/account.actions';

@Component({
  selector: 'jtt-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  constructor(
    private _store: Store<any>,
    private _jiraRequestOptionsService: JiraRequestOptionsService,
  ) {}

  public ngOnInit(): void {
    this._store.select('account', 'account', 'model')
      .filter(Boolean)
      .map(getHeaderOptionsByAccount)
      .do((account: IJiraRequestOptions) => this._jiraRequestOptionsService.setOptions(account))
      .subscribe()
  }

  public logout(): void {
    this._store.dispatch(new accountActions.Logout())
  }
}
