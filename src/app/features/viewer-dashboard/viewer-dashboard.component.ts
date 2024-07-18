import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-viewer-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './viewer-dashboard.component.html',
  styleUrl: './viewer-dashboard.component.css'
})
export default class ViewerDashboardComponent {

}
