import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesComponent } from './issues.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select', 'dispatch' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject([]));

    TestBed.configureTestingModule({
      declarations: [ IssuesComponent ],

      providers: [ { provide: Store, useValue: mockedStore } ],

      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
