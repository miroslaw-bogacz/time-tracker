import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { Store } from '@ngrx/store';
import { path, find, propEq } from 'ramda';

import { formatTimeSpent } from '../../../../core/helpers/format-time-spent.helper';
import { reduceActivitiesToTimeSpent } from '../../../helpers/reduce-activities.helper';
import { IAvatarConfig } from './../../../../user/models/i-avatar-config.model';

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

  public avatarConfig: IAvatarConfig = {
    height: 18,
    width: 18,
    textColor: '#495057',
  };

  constructor(
    private store: Store<any>,
  ) { }

  public ngOnInit() {
    this.worklog$ = this.store.select(path([ 'issues', 'worklogsList', 'model' ]))
      .map(find(propEq('id', this.issue.id)));

    this.timeSpent$ = Observable
      .interval(1000)
      .combineLatest(this.worklog$)
      .map(([ _, worklog ]) => worklog ? reduceActivitiesToTimeSpent(worklog.activities) : 0)
      .map((timeSpent: number) => formatTimeSpent((this.issue.fields.timespent * 1000) + timeSpent));
  }

  public start(): void {
    this.startTimeSpent.emit(this.issue);
  }

}
