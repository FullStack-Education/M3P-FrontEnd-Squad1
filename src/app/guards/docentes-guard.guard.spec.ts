import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { docentesGuardGuard } from './docentes-guard.guard';

describe('docentesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => docentesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
