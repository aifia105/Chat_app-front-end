import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

export const authguardGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.user()){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
