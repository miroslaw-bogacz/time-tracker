import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import { path, complement, isEmpty, equals } from 'ramda';
import * as moment from 'moment';

import * as filtersActions from '../../actions/filters.actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'wl-filters',
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.scss' ],
})
export class FiltersComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  private _filters$: Observable<any>;

  private _unsubscribe$: Subject<any> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
  ) { }

  ngOnInit(): void {
    this._filters$ = this._store.select(path([ 'worklogs', 'filters', 'model' ]));

    const from = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const to = moment().endOf('isoWeek').format('YYYY-MM-DD');

    this.form = this._getForm();

    this.form.valueChanges
      .debounceTime(300)
      .map((filters: any) => new filtersActions.Update(filters))
      .takeUntil(this._unsubscribe$)
      .subscribe((action: any) => this._store.dispatch(action));

    this.form.setValue({ from, to });

    this._filters$
      .filter(complement(isEmpty))
      .filter(complement(equals(this.form.value)))
      .takeUntil(this._unsubscribe$)
      .subscribe((filters: any) => this.form.patchValue(filters, { emitEvent: false }));
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  private _getForm(): FormGroup {
    return this._fb.group({
      from: '',
      to: '',
    });
  }

}
