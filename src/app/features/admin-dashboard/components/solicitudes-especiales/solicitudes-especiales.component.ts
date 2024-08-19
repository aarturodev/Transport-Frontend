import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-solicitudes-especiales',
  standalone: true,
  templateUrl: './solicitudes-especiales.component.html',
  styleUrls: ['./solicitudes-especiales.component.css'],
  imports: [ReactiveFormsModule, HeaderComponent]
})
export default class SolicitudesEspecialesComponent implements OnInit {

  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);
  private router = inject(Router)

  Rol = this.loginService.getRole();


  expediente:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarSolicitudesEspeciales(res).subscribe((res:any)=>{
        this.form.patchValue(res.result);

      });

       this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });

    })
  }


  form = new FormGroup({
    Descripcion : new FormControl(null),

  })


  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const SolicitudesEspeciales = {
      ...this.form.value,
      Expediente_Id : this.expediente.Id,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion : this.expedienteService.getDate(),
    }
    this.expedienteService.actualizarSolicitudesEspeciales(SolicitudesEspeciales).subscribe();

  }


}
