import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cadastroAlunoGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  if (JSON.parse(localStorage['currentUser']).role == 'ALUNO') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
