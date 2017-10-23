import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { assoc, dissoc, pipe, path, prop } from 'ramda';
import { Store } from '@ngrx/store';
import { IAccountReducers } from '../../models/i-account-reducers.model';
import { VerificationAccount } from '../../actions/create-account.actions';
import { Observable } from 'rxjs/Observable';
import { urlPattern } from '../../../core/helpers/patterns/url.pattern';
import { ICreateAccountState } from '../../models/i-create-account-state.model';

const getAccount = pipe(
  (account) => assoc('token', btoa(`${account.username}:${account.password}`), account),
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
    private _accountStore: Store<IAccountReducers>,
  ) { }

  public ngOnInit(): void {
    this.createAccount$ = this._accountStore.select(path([ 'account', 'createAccount' ]));
    this.isPending$ = this.createAccount$.map(prop('isPending'));

    this.form = this._getForm();
  }

  public save(): void {
    const account = this.form.value;
    const action = new VerificationAccount(getAccount(account));

    this._accountStore.dispatch(action);
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
