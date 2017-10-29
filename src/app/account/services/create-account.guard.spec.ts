import { TestBed, inject } from '@angular/core/testing';

import { CreateAccountGuard } from './create-account.guard';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateAccountGuard', () => {
  const mockedStore: any = jasmine.createSpyObj('mockedStore', [ 'select' ]);

  beforeEach(() => {
    mockedStore.select.and.returnValue(new BehaviorSubject({}));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],

      providers: [
        CreateAccountGuard,
        { provide: Store, useValue: mockedStore },
      ],
    });
  });

  it('should ...', inject([ CreateAccountGuard ], (guard: CreateAccountGuard) => {
    expect(guard).toBeTruthy();
  }));
});
