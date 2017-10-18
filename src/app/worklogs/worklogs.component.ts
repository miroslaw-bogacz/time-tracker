import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { path } from 'ramda';

@Component({
  selector: 'wl-worklogs',
  templateUrl: './worklogs.component.html',
  styleUrls: [ './worklogs.component.scss' ],
})
export class WorklogsComponent implements OnInit {

  public isPending$: Observable<boolean>;

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    this.isPending$ = this._store.select(path([ 'worklogs', 'worklogsList', 'isPending' ]));
  }

}
