import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from '@core/services/login.service';
import { catchError, map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {

  // inyectamos el servicio y el Router
  const authService= inject(LoginService);
  const router = inject(Router);

  const token = authService.getToken();

  if(!token){
    return router.navigate(['/login']);
  }


  return true
};
