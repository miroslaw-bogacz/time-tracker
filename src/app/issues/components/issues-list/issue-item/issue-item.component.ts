import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { Store } from '@ngrx/store';
import { path, find, propEq, isEmpty, complement } from 'ramda';

import { formatTimeSpent } from '../../../../core/helpers/format-time-spent.helper';
import { reduceActivitiesToTimeSpent } from '../../../helpers/reduce-activities.helper';

@Component({
  selector: 'is-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: [ './issue-item.component.scss' ],
})
export class IssueItemComponent implements OnInit {

  @Output() startTimeSpent: EventEmitter<string> = new EventEmitter();

  @Input() public issue: any;

  public worklog$: Observable<any>;

  public timeSpent$: Observable<string>;

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    this.worklog$ = this._store.select(path([ 'issues', 'worklogsList', 'model' ]))
      .filter(complement(isEmpty))
      .map(find(propEq('id', this.issue.id)));

    this.timeSpent$ = Observable
      .interval(1000)
      .combineLatest(this.worklog$)
      .map(([ _, worklog ]) => worklog ? reduceActivitiesToTimeSpent(worklog.activities) : 0)
      .map((timeSpent: number) => formatTimeSpent((this.issue.fields.timespent * 1000) + timeSpent))
  }

  public start(): void {
    this.startTimeSpent.emit(this.issue);
  }

}
