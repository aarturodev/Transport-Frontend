import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from '@core/services/login.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  // inyectamos el servicio y el Router
  const router = inject(Router);
  const authService = inject(LoginService);

  // validamos si el usuario es admin
  const role = authService.getRole();
  const ruta = route.url[0].path;
  console.log(role, ruta);
  if(ruta !== role){
    return router.navigate(['/'+role]);
  }

  return true;
};
