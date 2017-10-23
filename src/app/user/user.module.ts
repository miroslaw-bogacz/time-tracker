import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxElectronModule } from 'ngx-electron';

import { JiraApiModule } from '../shared/jira-api/jira-api.module';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserEffects } from './effects/user.effects';
import { userReducers } from './reducers/index.reducers';

@NgModule({
  imports: [
    CommonModule,
    JiraApiModule,
    StoreModule.forFeature('user', userReducers),
    EffectsModule.forFeature([ UserEffects ]),
    NgxElectronModule,
  ],
  providers: [

  ],
  declarations: [
    UserAvatarComponent,
],
  exports: [
    UserAvatarComponent,
  ],
})
export class UserModule { }
