import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogItemComponent } from './worklog-item.component';
import { Component } from '@angular/core';

@Component({
  template: `<is-worklog-item [worklog]="worklog"></is-worklog-item>`,
})
class ParentWorklogItemComponent {
  public worklog = {};
}

describe('WorklogItemComponent', () => {
  let component: ParentWorklogItemComponent;
  let fixture: ComponentFixture<ParentWorklogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentWorklogItemComponent, WorklogItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentWorklogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
