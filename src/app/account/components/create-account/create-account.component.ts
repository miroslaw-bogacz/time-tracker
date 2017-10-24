import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { assoc, dissoc, pipe, path, prop } from 'ramda';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/';

import { IAccountReducers } from '../../models/i-account-reducers.model';
import { VerificationAccount } from '../../actions/create-account.actions';
import { urlPattern } from '../../../core/helpers/patterns/url.pattern';
import { ICreateAccountState } from '../../models/i-create-account-state.model';
import { ICreateAccountForm } from '../../models/i-create-account-form.model';
import { IAccount } from '../../models/i-account.model';

const getAccount: (account: ICreateAccountForm) => IAccount = pipe(
  (account: ICreateAccountForm) => assoc('token', btoa(`${account.username}:${account.password}`), account),
  dissoc('password'),
);

@Component({
  selector: 'ac-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: [ './create-account.component.scss' ],
})
export class CreateAccountComponent implements OnInit {

  public form: FormGroup;

  public authTypes: any[] = [ { label: 'Basic auth', value: 'basic-auth' } ];

  public createAccount$: Observable<ICreateAccountState>;

  public isPending$: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this.createAccount$ = this._store.select('account', 'createAccount');
    this.isPending$ = this.createAccount$.map(prop('isPending'));

    this.form = this._getForm();
  }

  public save(): void {
    const account: ICreateAccountForm = this.form.value;
    const action: Action = new VerificationAccount(getAccount(account));

    this._store.dispatch(action);
  }

  private _getForm(): FormGroup {
    return this._fb.group({
      www: [ '', [ Validators.pattern(urlPattern), Validators.required ] ],
      auth: [ '', Validators.required ],
      username: [ '', Validators.required ],
      password: [ '', Validators.required ],
    });
  }

}
