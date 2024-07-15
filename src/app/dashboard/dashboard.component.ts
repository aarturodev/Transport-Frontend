import { Component, inject } from '@angular/core';
import { Router,RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';

import AdminDashboardComponent from '@features/admin-dashboard/admin-dashboard.component'
import EditorDashboardComponent from '@features/editor-dashboard/editor-dashboard.component'
import ViewerDashboardComponent from '@features/viewer-dashboard/viewer-dashboard.component'
import { HeaderComponent } from '@shared/components/header/header.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AdminDashboardComponent,
    EditorDashboardComponent,
    ViewerDashboardComponent,
    HeaderComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent{
  // inyectamos el Router
  router = inject(Router);
  service = inject(LoginService);

  // obtenemos el rol del usuario
  Role = this.service.getRole();


}
