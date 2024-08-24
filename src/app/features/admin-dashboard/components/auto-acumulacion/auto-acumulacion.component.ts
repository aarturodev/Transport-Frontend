import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-auto-acumulacion',
  standalone: true,
  templateUrl: './auto-acumulacion.component.html',
  styleUrls: ['./auto-acumulacion.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, TablaExpedienteComponent]

})
export default class AutoAcumulacionComponent implements OnInit {

  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);
  private router = inject(Router)

  Rol = this.loginService.getRole();


  expediente:any = {}
  autoAcumulacion:any = {}
  expedientetabla = signal({});

  ngOnInit(): void {

    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarAutoacumulacion(res).subscribe((res:any)=>{
        if(res.result.Fecha_Resolucion !== null){
          res.result.Fecha_Resolucion = res.result.Fecha_Resolucion.split("T")[0];
        }
        if(res.result.Fecha_Comunicacion !== null){
          res.result.Fecha_Comunicacion = res.result.Fecha_Comunicacion.split("T")[0];
        }
        this.autoAcumulacion = res.result;

        this.form.patchValue(res.result);

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
    Numero_Exp_Acumulado : new FormControl(null),
    Numero_Resolucion : new FormControl(null),
    Fecha_Resolucion : new FormControl(null),
    Fecha_Comunicacion : new FormControl(null),

  })


  crearAutoAcumulacion(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const AutoAcumulacion = {
      ...this.form.value,
      Expediente_Id : this.expediente.Id,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion : this.expedienteService.getDate(),
    }
    this.expedienteService.actualizarAutoacumulacion(AutoAcumulacion).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });

  }



}
