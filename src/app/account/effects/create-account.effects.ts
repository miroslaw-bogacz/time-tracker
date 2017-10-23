import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/';
import { prop } from 'ramda';

import * as createActions from '../actions/create-account.actions';
import * as accountActions from '../actions/account.actions';
import { JiraRequestOptionsService } from '../../shared/jira-api/services/jira-request-options.service';
import { JiraProjectsService } from '../../shared/jira-api/services/jira-projects.service';
import { getHeaderOptionsByAccount } from '../../core/helpers/get-header-options-by-account.helper';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class CreateAccountEffects {
  @Effect() public verificationAccount$: Observable<Action> = this._actions$
    .ofType(createActions.VERIFICATION_ACCOUNT)
    .map(prop('payload'))
    .do(this._setApiOptions.bind(this))
    .switchMap(this._verification.bind(this));

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _jiraRequestOptionsService: JiraRequestOptionsService,
    private _jiraProjectsService: JiraProjectsService,
    private _electron: ElectronService,
  ) {}

  private _setApiOptions(options): void {
    const { app } = this._electron.remote.require('electron');
    const fs = this._electron.remote.require('fs');
    const path = app.getPath('userData');


    try {
      fs.writeFileSync(path + '/domain', options.www);
    } catch (error) {
      console.log(error);
    }

    this._jiraRequestOptionsService.setOptions(getHeaderOptionsByAccount(options));
  }

  private _verification(account): Observable<Action> {
    return this._jiraProjectsService.getList()
      .concatMap(response => Observable.from([
        new createActions.VerificationAccountSuccess(),
        new accountActions.Update(account),
      ]))
      .catch(error => Observable.of(new createActions.VerificationAccountError(error)))
      .do(this._redirectToIssues.bind(this));
  }

  private _redirectToIssues(action): void {
    if (action.type === createActions.VERIFICATION_ACCOUNT_SUCCESS) {
      this._router.navigate([ '/issues' ]);
    }
  }
}
