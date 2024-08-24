import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.css'
})
export default class AperturaComponent implements OnInit{


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);
  private router = inject(Router)

  Rol = this.loginService.getRole();

  expediente:any = {}
  expedientetabla = signal({});
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
       this.expedienteService.getExpedienteTabla(res).subscribe((res)=>{
        this.expedientetabla.set(res);

        //this.expedientetabla = res

      })


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

    this.expedienteService.actualizarApertura(Expediente).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });

  }

}
