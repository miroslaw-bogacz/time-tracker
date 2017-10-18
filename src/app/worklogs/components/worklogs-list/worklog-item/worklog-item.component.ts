import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { timeHoursAndMinutes } from '../../../../core/helpers/patterns/time-hours-and-minutes.pattern';
import { stringTimeToSeconds } from '../../../../core/helpers/string-time-to-seconds.helper';
import { formatTimeSpent } from '../../../../core/helpers/format-time-spent.helper';

@Component({
  selector: 'wl-worklog-item',
  templateUrl: './worklog-item.component.html',
  styleUrls: [ './worklog-item.component.scss' ],
})
export class WorklogItemComponent implements OnInit {

  @Output() public saveClick: EventEmitter<any> = new EventEmitter();

  @Input() public worklog: any;

  public isVisible = false;

  public timeSpentControl: FormControl;

  public dateControl: FormControl;

  public get timeSpent(): string {
    return formatTimeSpent(this.worklog.timeSpentSeconds * 1000);
  }

  constructor() { }

  ngOnInit() {
    this.timeSpentControl = new FormControl(null, Validators.pattern(timeHoursAndMinutes));
    this.dateControl = new FormControl(moment(this.worklog.started).format('YYYY-MM-DD'));
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

  public showEdit(): void {
    this.isVisible = true;
  }

  public hideEdit(): void {
    this.isVisible = false;
  }

}
