import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return router.createUrlTree(['/login']);

  const user = auth.getUser();
  if (user && user.isActive === false) {
    auth.logout();
    return router.createUrlTree(['/login']);
  }

  return true;
};
