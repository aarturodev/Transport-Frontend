import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '@core/services/login.service';
import { EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const accessToken = loginService.getToken();
  const url = environment.apiUrl;

  if (req.url === url+"login") {
    return next(req);
  }

  if (req.url === url+"refresh") {
    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(reqClone);
  }
  if (req.url === url+"logout") {
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
