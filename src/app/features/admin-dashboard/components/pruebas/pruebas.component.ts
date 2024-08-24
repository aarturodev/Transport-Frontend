import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Conducta, ModalidadServicio, MotivoInvestigacion, SujetoSancionable, TipoPersonaNatural, TipoServicio } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css'
})
export default class PruebasComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  expediente:any = {}
  expedientetabla = signal({});


  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarPruebas(res).subscribe((res:any)=>{
        if(res.result.Fecha_Auto_Pruebas !== null){
          res.result.Fecha_Auto_Pruebas = new Date(res.result.Fecha_Auto_Pruebas).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Comunicacion_Auto_Pruebas !== null){
          res.result.Fecha_Comunicacion_Auto_Pruebas = new Date(res.result.Fecha_Comunicacion_Auto_Pruebas).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Auto_Traslado !== null){
          res.result.Fecha_Auto_Traslado = new Date(res.result.Fecha_Auto_Traslado).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Comunicacion_Auto_Traslado !== null){
          res.result.Fecha_Comunicacion_Auto_Traslado = new Date(res.result.Fecha_Comunicacion_Auto_Traslado).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Terminos_Alegatos !== null){
          res.result.Fecha_Terminos_Alegatos = new Date(res.result.Fecha_Terminos_Alegatos).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Radicado_Alegatos !== null){
          res.result.Fecha_Radicado_Alegatos = new Date(res.result.Fecha_Radicado_Alegatos).toISOString().split('T')[0];
        }
        this.form.patchValue(res.result);
      })

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      })
       this.expedienteService.getExpedienteTabla(res).subscribe((res)=>{
        this.expedientetabla.set(res);

        //this.expedientetabla = res

      })



    })
  }



  form = new FormGroup({
   No_Auto_Pruebas : new FormControl(null),
   Fecha_Auto_Pruebas : new FormControl(null),
   Fecha_Comunicacion_Auto_Pruebas : new FormControl(null),
   No_Auto_Traslado : new FormControl(null),
   Fecha_Auto_Traslado : new FormControl(null),
   Fecha_Comunicacion_Auto_Traslado : new FormControl(null),
   Fecha_Terminos_Alegatos : new FormControl(null),
   No_Radicado_Alegatos : new FormControl(null),
   Fecha_Radicado_Alegatos : new FormControl(null),
  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }
    const Pruebas = {
      ...this.form.value,
      Expediente_Id : this.expediente.Id,
      Ultima_Modificacion : this.expedienteService.getDate(),
      Usuario_Id : Number(this.loginService.getUser())
    }

    this.expedienteService.actualizarPruebas(Pruebas).subscribe({
       next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });

  }



}
