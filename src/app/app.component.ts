import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { complement, isNil } from 'ramda';

import { JiraRequestOptionsService } from './shared/jira-api/services/jira-request-options.service';
import { getHeaderOptionsByAccount } from './core/helpers/get-header-options-by-account.helper';
import { IJiraRequestOptions } from './shared/jira-api/models/jira-request-options.interface';
import * as accountActions from './account/actions/account.actions';
import { FetchCurrentUser } from './user/actions/user.actions';
import { IUser } from './user/models/i-user.model';

@Component({
  selector: 'jtt-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
  public hasAccount: boolean;
  public currentUser: IUser;

  private subscriptionKiller$: Subject<null> = new Subject();

  constructor(
    private store: Store<any>,
    private jiraRequestOptionsService: JiraRequestOptionsService,
  ) {}

  public ngOnInit(): void {
    this.getAccountAndSetJiraReqOpts();
    this.checkIfHasAccount();
    this.getAndAssignUser();
  }

  public ngOnDestroy(): void {
    this.subscriptionKiller$.next();
  }

  public logout(): void {
    this.store.dispatch(new accountActions.Logout());
  }

  private checkIfHasAccount(): void {
    this.store.select('account', 'account', 'model')
    .map((account: any) => !!account)
    .takeUntil(this.subscriptionKiller$)
    .subscribe((hasAccount) => {
      this.hasAccount = hasAccount;
    });
  }

  private getAccountAndSetJiraReqOpts(): void {
    this.store.select('account', 'account', 'model')
      .filter(complement(isNil))
      .map(getHeaderOptionsByAccount)
      .do((account: IJiraRequestOptions) => this.jiraRequestOptionsService.setOptions(account))
      .takeUntil(this.subscriptionKiller$)
      .subscribe();
  }

  private getAndAssignUser(): void {
    this.store.dispatch(new FetchCurrentUser());

    this.store.select('user', 'fetchCurrentUser', 'model')
      .filter(complement(isNil))
      .takeUntil(this.subscriptionKiller$)
      .subscribe((user: IUser) => {
        this.currentUser = user;
      });
  }

}
