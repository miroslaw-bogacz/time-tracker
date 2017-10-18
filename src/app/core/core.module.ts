import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [ OrderByDatePipe ],

  exports: [ OrderByDatePipe ],
})
export class CoreModule { }
