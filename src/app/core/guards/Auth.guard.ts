import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from '@core/services/login.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  // inyectamos el servicio y el Router
  const authService= inject(LoginService);
  const router = inject(Router);

  // validamos si el usuario está autenticado
  if(authService.isAutenticated()){
    return true;
  }else{
    return router.navigate(['/login']);
  }
};
