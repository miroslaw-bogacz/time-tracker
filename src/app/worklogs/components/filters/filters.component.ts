import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as filtersActions from '../../actions/filters.actions';

@Component({
  selector: 'wl-filters',
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.scss' ],
})
export class FiltersComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    this.form = this._getForm();
    this.form.valueChanges
      .debounceTime(300)
      .map((filters: any) => new filtersActions.Update(filters))
      .subscribe((action: any) => this._store.dispatch(action));
  }

  private _getForm(): FormGroup {
    return this._fb.group({
      from: '',
      to: '',
    });
  }

}
