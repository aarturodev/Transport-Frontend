import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  // inyectamos el servicio y el Router
  private http : LoginService = inject(LoginService);
  private router : Router = inject(Router);

  // Creamos un FormGroup para manejar los datos del formulario
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required], )
  });

  // banderas para mostrar mensajes de error y spinner de carga
  isLoading: boolean = false;
  message: boolean = false;

  // función para hacer login
  login(){
    this.isLoading = true;

    this.http.login(this.formGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.user.Rol === 1){
          this.router.navigate(['/dashboard/Admin']);
        }else if(res.username === 'viewer'){
          this.router.navigate(['/dashboard/Viewer']);
        }else if(res.username === 'editor'){
          this.router.navigate(['/dashboard/Editor']);
        }
        this.isLoading = false;
        this.message = false;
        this.formGroup.reset();

      },
      error: (error) => {
        console.log(error.error.message);
        this.isLoading = false;
        this.message = true;
        this.formGroup.reset();
      }
    });

  }

}
