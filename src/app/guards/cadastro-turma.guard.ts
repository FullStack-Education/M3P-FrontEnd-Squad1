import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cadastroTurmaGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  if (sessionStorage.getItem('role') == 'ADMIN'
|| sessionStorage.getItem('role') == 'PROFESSOR') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
