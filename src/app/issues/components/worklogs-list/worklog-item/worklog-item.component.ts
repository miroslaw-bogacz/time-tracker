import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';

import * as worklogStatuses from '../../../helpers/configs/worklog-statuses.config';
import { reduceActivitiesToTimeSpent } from '../../../helpers/reduce-activities.helper';
import { formatTimeSpent } from '../../../../core/helpers/format-time-spent.helper';

@Component({
  selector: 'is-worklog-item',
  templateUrl: './worklog-item.component.html',
  styleUrls: [ './worklog-item.component.scss' ],
})
export class WorklogItemComponent implements OnInit {

  @Output() public stopTrackingClick: EventEmitter<string> = new EventEmitter();

  @Output() public resumeTrackingClick: EventEmitter<string> = new EventEmitter();

  @Output() public pauseTrackingClick: EventEmitter<string> = new EventEmitter();

  @Input() public worklog: any;

  public timeSpent$: Observable<string>;

  public get isTracked(): boolean {
    return this.worklog.status === worklogStatuses.TRACKED;
  }

  public get isPaused(): boolean {
    return this.worklog.status === worklogStatuses.PAUSED;
  }

  constructor() { }

  ngOnInit() {
    this.timeSpent$ = Observable
      .timer(0, 1000)
      .map(() => reduceActivitiesToTimeSpent(this.worklog.activities))
      .map(formatTimeSpent);
  }

  public onStopClick(): void {
    this.stopTrackingClick.emit(this.worklog.id);
  }

  public onPauseClick(): void {
    this.pauseTrackingClick.emit(this.worklog.id);
  }

  public onResumeClick(): void {
    this.resumeTrackingClick.emit(this.worklog.id);
  }

}
