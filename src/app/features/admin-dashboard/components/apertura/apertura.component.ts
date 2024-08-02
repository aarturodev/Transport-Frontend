import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.css'
})
export default class AperturaComponent implements OnInit{


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);
  private router = inject(Router)

  expediente:any = {}
  apertura:any = {}

   ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarApertura(res).subscribe((res:any)=>{

        this.apertura = res.result;

        if(res.result.Fecha_Resolucion !== null){
          res.result.Fecha_Resolucion = new Date(res.result.Fecha_Resolucion).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Notificacion !== null){
          res.result.Fecha_Notificacion = new Date(res.result.Fecha_Notificacion).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Max_Descargos !== null){
          res.result.Fecha_Max_Descargos = new Date(res.result.Fecha_Max_Descargos).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Radicado !== null){
          res.result.Fecha_Radicado = new Date(res.result.Fecha_Radicado).toISOString().split('T')[0];
        }

        this.form.patchValue(this.apertura);
      })

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });


    })
  }

  form = new FormGroup({
    Numero_Resolucion : new FormControl(null),
    Fecha_Resolucion : new FormControl(null),
    Fecha_Notificacion : new FormControl(null),
    Fecha_Max_Descargos : new FormControl(null),
    Numero_radicado : new FormControl(null),
    Fecha_Radicado : new FormControl(null),

  });

  actualizarApertura(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Expediente = {
      Expediente_Id : this.expediente.Id,
      Numero_Resolucion : this.form.value.Numero_Resolucion,
      Fecha_Resolucion : this.form.value.Fecha_Resolucion,
      Fecha_Notificacion : this.form.value.Fecha_Notificacion,
      Fecha_Max_Descargos : this.form.value.Fecha_Max_Descargos,
      Numero_radicado : this.form.value.Numero_radicado,
      Fecha_Radicado : this.form.value.Fecha_Radicado,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarApertura(Expediente).subscribe();

  }


}
