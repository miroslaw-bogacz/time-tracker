import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogItemComponent } from './worklog-item.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  template: `<wl-worklog-item [worklog]="worklog"></wl-worklog-item>`,
})
class ParentWorklogItemComponent {
  public worklog = { issue: {} };
}

describe('WorklogItemComponent', () => {
  let component: ParentWorklogItemComponent;
  let fixture: ComponentFixture<ParentWorklogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentWorklogItemComponent, WorklogItemComponent ],

      schemas: [ NO_ERRORS_SCHEMA ],
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
