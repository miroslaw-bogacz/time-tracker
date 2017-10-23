import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { path, equals } from 'ramda';
import { Store } from '@ngrx/store';

import * as filtersActions from '../../actions/filters.actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'is-filters',
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.scss' ],
})
export class FiltersComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  private _unsubscribe$: Subject<any> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this.form = this._getForm();

    this._store.select(path([ 'issues', 'filters', 'model' ]))
      .distinctUntilChanged(equals(this.form.value))
      .takeUntil(this._unsubscribe$)
      .subscribe((filters) => this.form.patchValue(filters, { emitEvent: false }));

    this.form.valueChanges
      .debounceTime(300)
      .map((filters: any) => new filtersActions.Update(filters))
      .takeUntil(this._unsubscribe$)
      .subscribe((action) => this._store.dispatch(action));
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  private _getForm(): FormGroup {
    return this._fb.group({
      keywords: '',
    });
  }

}
