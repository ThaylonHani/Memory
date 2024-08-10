import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const localData = sessionStorage.getItem('token');
  if ( localData != null) {
    return true
  }
  else {
    router.navigateByUrl("login")
    return false
  }

};
