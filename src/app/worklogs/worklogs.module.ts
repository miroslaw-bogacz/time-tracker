import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorklogsRoutingModule } from './worklogs-routing.module';
import { WorklogsComponent } from './worklogs.component';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.component';
import { WorklogItemComponent } from './components/worklogs-list/worklog-item/worklog-item.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { worklogsReducers } from './reducers/index.reducers';
import { EffectsModule } from '@ngrx/effects';
import { WorklogsListEffects } from './effects/worklogs-list.effects';
import { CoreModule } from '../core/core.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    WorklogsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('worklogs', worklogsReducers),
    EffectsModule.forFeature([ WorklogsListEffects ]),
    SpinnerModule,
  ],

  declarations: [ WorklogsComponent, WorklogsListComponent, WorklogItemComponent, FiltersComponent ],
})
export class WorklogsModule { }
