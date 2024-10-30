import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cadastroDocenteGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  if (sessionStorage.getItem('role') == 'ADMINs') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
