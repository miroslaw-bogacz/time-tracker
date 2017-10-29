import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesListComponent } from './issues-list.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
  template: `<is-issues-list [scrolled]="scrolled"></is-issues-list>`,
})
class ParentIssueListComponent {
  public scrolled = new Subject();
}

describe('IssuesListComponent', () => {
  let component: ParentIssueListComponent;
  let fixture: ComponentFixture<ParentIssueListComponent>;

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select', 'dispatch' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject([]));

    TestBed.configureTestingModule({
      declarations: [ ParentIssueListComponent, IssuesListComponent ],

      providers: [ { provide: Store, useValue: mockedStore } ],

      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
