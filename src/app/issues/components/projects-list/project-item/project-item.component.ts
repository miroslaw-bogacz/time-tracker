import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'is-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: [ './project-item.component.scss' ],
})
export class ProjectItemComponent implements OnInit {

  @Input() public project: any;

  @Output() public changeProject: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
  }

  public onChangeProject(): void {
    this.changeProject.emit(this.project.key);
  }

}
