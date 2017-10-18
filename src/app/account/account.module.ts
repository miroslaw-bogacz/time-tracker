import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { accountReducers } from './reducers/index.reducers';
import { CreateAccountEffects } from './effects/create-account.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JiraApiModule } from '../shared/jira-api/jira-api.module';
import { CreateAccountGuard } from './services/create-account.guard';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    JiraApiModule,
    HttpModule,
    StoreModule.forFeature('account', accountReducers),
    EffectsModule.forFeature([ CreateAccountEffects ]),
    SpinnerModule,
    NgxElectronModule,
  ],

  providers: [ CreateAccountGuard ],

  declarations: [ AccountComponent, CreateAccountComponent ],
})
export class AccountModule { }
