import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { path } from 'ramda';
import { Remove } from './actions/toast-messages.actions';

@Component({
  selector: 'tm-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: [ './toast-messages.component.scss' ],
})
export class ToastMessagesComponent implements OnInit {

  public messages$: Observable<any[]>;

  constructor(
    private _store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this.messages$ = this._store.select(path([ 'toastMessages', 'toastMessagesList', 'model' ]));
  }

  public onCloseClick(id: string): void {
    this._store.dispatch(new Remove(id));
  }

}
