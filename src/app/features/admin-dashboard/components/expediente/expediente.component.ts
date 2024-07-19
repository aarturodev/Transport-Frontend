import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import TablaComponent from "@features/admin-dashboard/components/expediente/components/tabla/tabla.component";
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, TablaComponent, HeaderComponent],
  templateUrl: './expediente.component.html',
  styleUrl: './expediente.component.css',
})
export default class ExpedienteComponent {

}
