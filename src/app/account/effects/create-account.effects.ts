import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/';
import { prop } from 'ramda';
import { ElectronService } from 'ngx-electron';

import * as createActions from '../actions/create-account.actions';
import * as accountActions from '../actions/account.actions';
import * as toastMessagesListActions from '../../shared/toast-messages/actions/toast-messages.actions';
import { JiraRequestOptionsService } from '../../shared/jira-api/services/jira-request-options.service';
import { JiraUserService } from '../../shared/jira-api/services/jira-user.service';
import { getHeaderOptionsByAccount } from '../../core/helpers/get-header-options-by-account.helper';
import { IAccount } from '../models/i-account.model';

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
    private _jiraUserService: JiraUserService,
    private _electron: ElectronService,
  ) {}

  private _setApiOptions(account: IAccount): void {
    const { app } = this._electron.remote.require('electron');
    const fs = this._electron.remote.require('fs');
    const path = app.getPath('userData');

    try {
      fs.writeFileSync(path + '/domain', account.www);
    } catch (error) {
      console.log(error);
    }

    this._jiraRequestOptionsService.setOptions(getHeaderOptionsByAccount(account));
  }

  private _verification(account: IAccount): Observable<Action> {
    return this._jiraUserService.getCurrentUser()
      .concatMap(response => Observable.from([
        new createActions.VerificationAccountSuccess(),
        new accountActions.Update(account),
        new toastMessagesListActions.AddSuccess({ content: 'Your account has been added' }),
      ]))
      .catch(error => Observable.from([
        new createActions.VerificationAccountError(error),
        new toastMessagesListActions.AddError({ content: `Status: ${error.status} Something was wrong` }),
      ]))
      .do(this._redirectToIssues.bind(this));
  }

  private _redirectToIssues(action): void {
    if (action.type === createActions.VERIFICATION_ACCOUNT_SUCCESS) {
      this._router.navigate([ '/issues' ]);
    }
  }
}
