import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cadastroAlunoGuard } from './cadastro-aluno.guard';

describe('cadastroAlunoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cadastroAlunoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
