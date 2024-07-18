import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '@core/services/login.service';
import { Router } from '@angular/router';
import { catchError, EMPTY,tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  const accessToken = authService.Token;

  if (req.url.includes('login') || req.url.includes('refresh-token')) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders:{
      Authorization:`Bearer ${accessToken}`
    }
  });


  return next(authReq).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status === HttpStatusCode.Unauthorized){
        console.log("capturamos el error");

        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        return next(authReq)
      }
      return EMPTY;
    })
  )
};

