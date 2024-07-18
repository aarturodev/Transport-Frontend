import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import TablaComponent from "@features/admin-dashboard/components/expediente/components/tabla/tabla.component";
import { LoginService } from '@core/services/login.service';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, TablaComponent],
  templateUrl: './expediente.component.html',
  styleUrl: './expediente.component.css'
})
export default class ExpedienteComponent {

  form = new FormGroup({
    expediente: new FormControl('',Validators.required),
  });

  router = inject(Router);
  authService = inject(LoginService);


  buscarExpediente(){
    console.log('Buscando expediente...');
    console.log(this.form.value);

  }

}
