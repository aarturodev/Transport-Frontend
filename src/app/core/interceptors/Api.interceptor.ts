import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '@core/services/login.service';
import { EMPTY } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const accessToken = loginService.getToken();

  if (req.url === "http://localhost:3000/login") {
    return next(req);
  }

  if (req.url === "http://localhost:3000/refresh") {
    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(reqClone);
  }
  if (req.url === "http://localhost:3000/logout") {
    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(reqClone);
  }

  if (loginService.isRefreshing) {
    return EMPTY;
  }

  const reqClone = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(reqClone);
};
