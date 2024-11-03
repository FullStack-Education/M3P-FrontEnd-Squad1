import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cadastroTurmaGuard } from './cadastro-turma.guard';

describe('cadastroTurmaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cadastroTurmaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
