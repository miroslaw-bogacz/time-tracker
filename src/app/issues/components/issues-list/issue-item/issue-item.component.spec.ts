import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueItemComponent } from './issue-item.component';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<is-issue-item [issue]="issue"></is-issue-item>`,
})
class ParentIssueItemComponent {
  public issue;
}

describe('IssueItemComponent', () => {
  let parentComponent: ParentIssueItemComponent;
  let parentFixture: ComponentFixture<ParentIssueItemComponent>;
  let component: IssueItemComponent;

  const mockedIssue = {
    id: '1234',
    fields: {
      status: {
        name: 'To Do',
      },

      priority: {
        iconUrl: 'http://domain.com/image-test.jpg',
        name: 'Medium',
      },
    },
  };

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject({}));

    TestBed.configureTestingModule({
      declarations: [ ParentIssueItemComponent, IssueItemComponent ],

      providers: [ { provide: Store, useValue: mockedStore } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(ParentIssueItemComponent);
    parentComponent = parentFixture.componentInstance;
    parentComponent.issue = mockedIssue;
    parentFixture.detectChanges();

    component = parentFixture.debugElement.query(By.css('is-issue-item')).componentInstance;
  });

  it('should create', () => {
    expect(parentComponent).toBeTruthy();
  });

  describe('when status has been call', () => {

    it('should return', () => {
      expect(component.status).toEqual('To Do');
    });

  });

  describe('when priority has been call', () => {

    it('should return', () => {
      expect(component.priority).toEqual(mockedIssue.fields.priority);
    });

  });
});
