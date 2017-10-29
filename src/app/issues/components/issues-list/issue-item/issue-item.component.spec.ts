import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueItemComponent } from './issue-item.component';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component } from '@angular/core';

@Component({
  template: `<is-issue-item [issue]="issue"></is-issue-item>`,
})
class ParentIssueItemComponent {
  public issue = { id: '' };
}

describe('IssueItemComponent', () => {
  let component: ParentIssueItemComponent;
  let fixture: ComponentFixture<ParentIssueItemComponent>;

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
    fixture = TestBed.createComponent(ParentIssueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.issue = { id: '' };
    expect(component).toBeTruthy();
  });
});
