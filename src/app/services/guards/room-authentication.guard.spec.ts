import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roomAuthenticationGuard } from './room-authentication.guard';

describe('roomAuthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roomAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
