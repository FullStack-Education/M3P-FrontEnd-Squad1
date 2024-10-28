import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cadastroDocenteGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  if (JSON.parse(localStorage['currentUser']).role == 'DOCENTE') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
