import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountComponent } from './create-account.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';


describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  const mockedStore: any = jasmine.createSpyObj('mockedStore', [ 'select' ]);

  beforeEach(async(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject({}));

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ CreateAccountComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ { provide: Store, useValue: mockedStore } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
