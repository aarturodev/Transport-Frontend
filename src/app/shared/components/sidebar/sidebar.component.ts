import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

 // inyectamos el Router y obtenemos el usuario de la URL
  private LoginService = inject(LoginService);
  private router = inject(Router);

  Rol = this.LoginService.getRole();

  // función para cerrar sesión
  logout(){
    this.LoginService.logout();
  }

}
