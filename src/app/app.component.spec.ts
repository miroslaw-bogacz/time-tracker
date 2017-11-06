import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { JiraRequestOptionsService } from './shared/jira-api/services/jira-request-options.service';
import * as accountActions from './account/actions/account.actions';

describe('AppComponent', () => {
  let fixture;
  let app;
  let storeBehaviorSubject;

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select', 'dispatch' ]);

  const mockedJiraRequestOptionsService = jasmine
    .createSpyObj('mockedJiraRequestOptionsService', [ 'setOptions' ]);

  const mockedAccount = {
    www: 'http://www.test-www.com',
    username: 'test-username',
    token: 'test-token',
  };

  beforeEach(async(() => {
    storeBehaviorSubject = new BehaviorSubject(mockedAccount);

    mockedStore.select.and.returnValue(storeBehaviorSubject);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],

      providers: [
        { provide: Store, useValue: mockedStore },
        { provide: JiraRequestOptionsService, useValue: mockedJiraRequestOptionsService },
      ],

      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(app).toBeTruthy();
  });

  describe('when store return account', () => {

    it('should be call JiraRequestOptionsService.setOptions', () => {
      expect(mockedJiraRequestOptionsService.setOptions)
        .toHaveBeenCalledWith({
          protocol: 'http',
          port: null,
          domain: 'www.test-www.com',
          authentication: 'Basic Auth',
          token: 'test-token',
        });
    });
  });

  describe('when logout has been call', () => {

    beforeEach(() => {
      app.logout();
    });

    it('should be call dispatch with action', () => {
      expect(mockedStore.dispatch).toHaveBeenCalledWith(new accountActions.Logout());
    });

  });
});
