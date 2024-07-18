import { HttpStatusCode, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@core/services/login.service';
import { catchError, concatMap, EMPTY, finalize, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === HttpStatusCode.Unauthorized) {

        if (loginService.isRefreshing) {
          // Si ya se está refrescando el token, no hacemos nada
          return EMPTY;
        }

        loginService.isRefreshing = true;

        console.log("Entró al error - Unauthorized");

        return loginService.refresToken().pipe(

          finalize(() => {
            loginService.isRefreshing = false;
          }),

          concatMap((response) => {
            // Actualizamos el token
            loginService.setToken(response.token);
            console.log("************* Token Actualizado *************");

            const accessToken = loginService.getToken();

            const reqClone = req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`
              }
            });

            return next(reqClone);
          }),

          catchError(() => {
            console.log("********** Error en el Refresh Token **************");
            router.navigateByUrl("/");
            return EMPTY;
          })
        );
      }

      return throwError(() => error);
    })
  );
};
