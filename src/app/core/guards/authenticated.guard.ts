import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from '@core/services/login.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {

  // inyectamos el servicio y el Router
  const authService= inject(LoginService);
  const router = inject(Router);

  // validamos si el usuario está autenticado
  if(authService.isAutenticated()){
    const role = authService.getRole();
   return router.navigate(['/dashboard/'+role]);
  }
  return true
};
