import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorklogsComponent } from './worklogs.component';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.component';

const routes: Routes = [
  {
    path: 'worklogs',
    component: WorklogsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WorklogsListComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WorklogsRoutingModule { }
