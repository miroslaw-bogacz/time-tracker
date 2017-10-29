import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogsComponent } from './worklogs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('WorklogsComponent', () => {
  let component: WorklogsComponent;
  let fixture: ComponentFixture<WorklogsComponent>;

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select', 'dispatch' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject([]));

    TestBed.configureTestingModule({
      declarations: [ WorklogsComponent ],

      providers: [ { provide: Store, useValue: mockedStore } ],

      schemas: [ NO_ERRORS_SCHEMA ],
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
