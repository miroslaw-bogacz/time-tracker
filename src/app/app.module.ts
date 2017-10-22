import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreConfig } from '@ngrx/store/src/store_module';
import { AccountModule } from './account/account.module';
import { IssuesModule } from './issues/issues.module';
import { WorklogsModule } from './worklogs/worklogs.module';
import { UserModule } from './user/user.module';

const reducers: ActionReducerMap<any> = { };

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [ { account: [ 'account' ] } ],
    rehydrate: true,
  })(reducer);
}
const metaReducers: ActionReducer<any, any>[] = [ localStorageSyncReducer ];

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, <StoreConfig<any, any>>{ metaReducers, initialState: { account: {} } }),
    StoreDevtoolsModule.instrument(),
    AccountModule,
    IssuesModule,
    WorklogsModule,
    UserModule,
  ],

  providers: [],

  bootstrap: [ AppComponent ],
})
export class AppModule { }
