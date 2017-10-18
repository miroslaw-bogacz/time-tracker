import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CreateAccountGuard } from './services/create-account.guard';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'create-account', pathMatch: 'full' },
      { path: 'create-account', component: CreateAccountComponent, canActivate: [ CreateAccountGuard ] },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
