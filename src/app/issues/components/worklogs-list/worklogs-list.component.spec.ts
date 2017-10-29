import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogsListComponent } from './worklogs-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('WorklogsListComponent', () => {
  let component: WorklogsListComponent;
  let fixture: ComponentFixture<WorklogsListComponent>;

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select', 'dispatch' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject([]));

    TestBed.configureTestingModule({
      declarations: [ WorklogsListComponent ],

      providers: [ { provide: Store, useValue: mockedStore } ],

      schemas: [ NO_ERRORS_SCHEMA ],
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
