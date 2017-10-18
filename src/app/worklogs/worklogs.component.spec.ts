import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogsComponent } from './worklogs.component';

describe('WorklogsComponent', () => {
  let component: WorklogsComponent;
  let fixture: ComponentFixture<WorklogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
