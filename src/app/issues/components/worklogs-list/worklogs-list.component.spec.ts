import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogsListComponent } from './worklogs-list.component';

describe('WorklogsListComponent', () => {
  let component: WorklogsListComponent;
  let fixture: ComponentFixture<WorklogsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogsListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
