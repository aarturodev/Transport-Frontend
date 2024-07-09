import {Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import AdminDashboardComponent from '@features/admin-dashboard/admin-dashboard.component'
import EditorDashboardComponent from '@features/editor-dashboard/editor-dashboard.component'
import ViewerDashboardComponent from '@features/viewer-dashboard/viewer-dashboard.component'
import { HeaderComponent } from '@shared/components/header/header.component';

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
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent{

  constructor(private router : Router) {
  }
  usuario: string = this.router.url.split('/')[2];


}
