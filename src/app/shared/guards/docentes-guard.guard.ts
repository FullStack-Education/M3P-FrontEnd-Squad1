import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const docentesGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if (sessionStorage.getItem('role') == 'ADMIN') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
  
};
