import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessagesComponent } from './toast-messages.component';
import { StoreModule } from '@ngrx/store';
import { toastMessagesReducers } from './reducers/index.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('toastMessages', toastMessagesReducers),
  ],

  declarations: [ ToastMessagesComponent ],

  exports: [ ToastMessagesComponent ],
})
export class ToastMessagesModule { }
