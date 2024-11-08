import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notasGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if (sessionStorage.getItem('role') == 'ALUNO') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
  
};
