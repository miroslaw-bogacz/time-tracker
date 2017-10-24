import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { JiraRequestOptionsService } from './shared/jira-api/services/jira-request-options.service';
import { getHeaderOptionsByAccount } from './core/helpers/get-header-options-by-account.helper';
import { IJiraRequestOptions } from './shared/jira-api/models/jira-request-options.interface';
import * as accountActions from './account/actions/account.actions';
import { Subject } from 'rxjs/Subject';
import { IAccount } from './account/models/i-account.model';

@Component({
  selector: 'jtt-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {

  public account$: Observable<IAccount>;

  public hasAccount$: Observable<boolean>;

  private _unsubscribe$: Subject<any> = new Subject();

  constructor(
    private _store: Store<any>,
    private _jiraRequestOptionsService: JiraRequestOptionsService,
  ) {}

  public ngOnInit(): void {
    this.account$ = this._store.select('account', 'account', 'model');
    this.hasAccount$ = this.account$.map((account: IAccount) => !!account);

    this.account$
      .filter(Boolean)
      .map(getHeaderOptionsByAccount)
      .takeUntil(this._unsubscribe$)
      .subscribe((account: IJiraRequestOptions) => this._jiraRequestOptionsService.setOptions(account));
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  public logout(): void {
    this._store.dispatch(new accountActions.Logout());
  }
}
