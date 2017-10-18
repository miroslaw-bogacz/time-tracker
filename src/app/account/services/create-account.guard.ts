import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IAccountState } from '../models/i-account-state.model';
import { IAccountReducers } from '../models/i-account-reducers.model';

@Injectable()
export class CreateAccountGuard implements CanActivate {
  constructor(
    private _store: Store<any>,
    private _router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select('account', 'account', 'model')
      .map((model: any) => {
        const hasAccount = !!model;

        if (hasAccount) {
          this._router.navigate([ '/issues' ]);
        }

        return !hasAccount;
      });
  }
}
