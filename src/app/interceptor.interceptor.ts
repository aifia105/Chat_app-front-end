import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/Auth.service';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.user()?.token;
  if(token != null){
    req = req.clone({
      setHeaders: {
        Authorization:  `Bearer ${token}`
      },
    });
  }
  return next(req);
};
