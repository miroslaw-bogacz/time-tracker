import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { JiraRequestOptionsService } from './shared/jira-api/services/jira-request-options.service';

describe('AppComponent', () => {
  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select' ]);

  const mockedJiraRequestOptionsService = jasmine
    .createSpyObj('mockedJiraRequestOptionsService', [ 'setOptions' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject({}));


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

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
