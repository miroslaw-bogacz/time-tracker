import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogItemComponent } from './worklog-item.component';

describe('WorklogItemComponent', () => {
  let component: WorklogItemComponent;
  let fixture: ComponentFixture<WorklogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
