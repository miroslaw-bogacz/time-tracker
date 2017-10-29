import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMessagesComponent } from './toast-messages.component';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('ToastMessagesComponent', () => {
  let component: ToastMessagesComponent;
  let fixture: ComponentFixture<ToastMessagesComponent>;

  const mockedStore: any = jasmine
    .createSpyObj('mockedStore', [ 'select', 'dispatch' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject([]));

    TestBed.configureTestingModule({
      declarations: [ ToastMessagesComponent ],

      providers: [ { provide: Store, useValue: mockedStore } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
