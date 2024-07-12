import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/Auth.guard';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: ()=> import('@features/login/login.component'),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'dashboard',
    loadComponent: ()=> import('@dashboard/dashboard.component'),
    children: [
      {
        path: 'Admin',
        title: 'Panel Administrador',
        loadComponent: ()=> import('@features/admin-dashboard/admin-dashboard.component'),
        children: [
          {
            path: 'Expedientes',
            loadComponent: ()=> import('@features/admin-dashboard/components/expediente/expediente.component')
          },
          {
            path: 'Apertura',
            loadComponent: ()=> import('@features/admin-dashboard/components/apertura/apertura.component')
          },
          {
            path: 'Inhibitorio',
            loadComponent: ()=> import('@features/admin-dashboard/components/inhibitorio/inhibitorio.component')
          },
          {
            path: 'Pruebas',
            loadComponent: ()=> import('@features/admin-dashboard/components/pruebas/pruebas.component')
          },
          {
            path: 'Aceptacion-cargos',
            loadComponent: ()=> import('@features/admin-dashboard/components/aceptacion-cargos/aceptacion-cargos.component')
          },
          {
            path: 'Fallo',
            loadComponent: ()=> import('@features/admin-dashboard/components/fallo/fallo.component')
          },
          {
            path: 'Recurso-primera-instancia',
            loadComponent: ()=> import('@features/admin-dashboard/components/recurso-primera-instancia/recurso-primera-instancia.component')
          },
          {
            path: 'Recurso-segunda-instancia',
            loadComponent: ()=> import('@features/admin-dashboard/components/recurso-segunda-instancia/recurso-segunda-instancia.component')
          },
          {
            path: 'Recurso-queja-revocatoria-directa',
            loadComponent: ()=> import('@features/admin-dashboard/components/recurso-queja-revocatoria-directa/recurso-queja-revocatoria-directa.component')
          },
          {
            path: 'Ejecutoria',
            loadComponent: ()=> import('@features/admin-dashboard/components/ejecutoria/ejecutoria.component')
          },
          {
            path: 'Gestion-cobro',
            loadComponent: ()=> import('@features/admin-dashboard/components/gestion-cobro/gestion-cobro.component')
          },
          {
            path: 'Ajuste-derecho-aclaratorio',
            loadComponent: ()=> import('@features/admin-dashboard/components/ajuste-derecho-aclaratorio/ajuste-derecho-aclaratorio.component')
          },
          {
            path: 'Estado',
            loadComponent: ()=> import('@features/admin-dashboard/components/estado/estado.component')
          },
          {
            path: 'Asignacion',
            loadComponent: ()=> import('@features/admin-dashboard/components/asignacion/asignacion.component')
          },
          {
            path: 'Administrador-usuarios',
            loadComponent: ()=> import('@features/admin-dashboard/components/administrador-usuarios/administrador-usuarios.component')
          },
          {
            path: '',
            redirectTo: 'Expedientes',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'Editor',
        title: 'Panel Usuario',
        loadComponent: ()=> import('@features/editor-dashboard/editor-dashboard.component'),
        children: [
          {
            path: 'Expedientes',
            loadComponent: ()=> import('@features/admin-dashboard/components/expediente/expediente.component')
          },
          {
            path: 'Apertura',
            loadComponent: ()=> import('@features/admin-dashboard/components/apertura/apertura.component')
          },
          {
            path: '',
            redirectTo: 'Expedientes',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'Viewer',
        title: 'Panel Usuario',
        loadComponent: ()=> import('@features/viewer-dashboard/viewer-dashboard.component'),
        children: [
          {
            path: 'Expedientes',
            loadComponent: ()=> import('@features/admin-dashboard/components/expediente/expediente.component')
          },
          {
            path: 'Apertura',
            loadComponent: ()=> import('@features/admin-dashboard/components/apertura/apertura.component')
          },
          {
            path: '',
            redirectTo: 'Expedientes',
            pathMatch: 'full'
          }
        ]
      },
    ],
    canActivate: [AuthGuard]

  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];
