import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-editor-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './editor-dashboard.component.html',
  styleUrl: './editor-dashboard.component.css'
})
export default class EditorDashboardComponent {

}
