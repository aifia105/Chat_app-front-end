import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from './services/persistance.service';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {


  const persist =inject(PersistanceService);
  const token = persist.get('token')
  if(token != null){
    req = req.clone({
      setHeaders: {
        Authorization:  `Bearer ${token}`
      },
    });
  }
  return next(req);
};
