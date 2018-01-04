import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { pipe, pick } from 'ramda';

import { timeHoursAndMinutes } from '../../../../core/helpers/patterns/time-hours-and-minutes.pattern';
import { stringTimeToSeconds } from '../../../../core/helpers/string-time-to-seconds.helper';
import { formatTimeSpent } from '../../../../core/helpers/format-time-spent.helper';

const clearTimeSpent = (time) => time
  .replace(/([0-9]+):([0-9]+):(.*)/g, '$1h $2min')
  .replace(/0([0-9]+h)/, '$1')
  .replace(/0([0-9]+min)/, '$1')
  .replace(/^0h\s/, '')
  .replace(/(^|\s)0min/, '');

@Component({
  selector: 'wl-worklog-item',
  templateUrl: './worklog-item.component.html',
  styleUrls: [ './worklog-item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorklogItemComponent implements OnInit {

  @Output() public saveClick: EventEmitter<any> = new EventEmitter();

  @Output() public removeClick: EventEmitter<any> = new EventEmitter();

  @Output() public copyClick: EventEmitter<any> = new EventEmitter();

  @Input() public worklog: any;

  public isVisible = false;

  public timeSpentControl: FormControl;

  public dateControl: FormControl;

  public get timeSpent(): string {
    return formatTimeSpent(this.worklog.timeSpentSeconds * 1000);
  }

  constructor() { }

  ngOnInit() {
    const time = pipe(formatTimeSpent, clearTimeSpent)(this.worklog.timeSpentSeconds * 1000);

    this.timeSpentControl = new FormControl(time, Validators.pattern(timeHoursAndMinutes));
    this.dateControl = new FormControl(moment(this.worklog.started).format('YYYY-MM-DD'));

    // Workaround for pattern validator
    this.timeSpentControl.updateValueAndValidity();
  }

  public onSaveClick(): void {
    const started = this.dateControl.value;
    const timeSpentSeconds = this.timeSpentControl.value;

    const worklog = {
      ...this.worklog,
      timeSpentSeconds: !!timeSpentSeconds ? stringTimeToSeconds(timeSpentSeconds) : this.worklog.timeSpentSeconds,
      started: !!started ? moment(started).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : this.worklog.started,
    };

    this.saveClick.emit(worklog);
  }

  public onRemoveClick(): void {
    this.removeClick.emit(pick([ 'issueId', 'id' ], this.worklog));
  }

  public showEdit(): void {
    this.isVisible = true;
  }

  public hideEdit(): void {
    this.isVisible = false;
  }

  public onClickCopy(): void {
    this.copyClick.emit(this.worklog);
  }

}
