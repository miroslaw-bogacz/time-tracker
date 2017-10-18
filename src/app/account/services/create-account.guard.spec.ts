import { TestBed, inject } from '@angular/core/testing';

import { CreateAccountGuard } from './create-account.guard';

describe('CreateAccountGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CreateAccountGuard ],
    });
  });

  it('should ...', inject([ CreateAccountGuard ], (guard: CreateAccountGuard) => {
    expect(guard).toBeTruthy();
  }));
});
