import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-recurso-queja-revocatoria-directa',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './recurso-queja-revocatoria-directa.component.html',
  styleUrl: './recurso-queja-revocatoria-directa.component.css'
})
export default class RecursoQuejaRevocatoriaDirectaComponent {



  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();


  recQuejaRevocatoriaDirecta:any = []
  decisionQuejaRevocatoria:any = []
  revocatoriaDirecta:any = {}
  expediente:any = {}
  expedientetabla = signal({});

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarRecQuejaRevocatoria(res).subscribe((res:any)=>{
        if(res.result.Fecha_Radicado !== null){
          res.result.Fecha_Radicado = res.result.Fecha_Radicado.split('T')[0];
        }
        if(res.result.Fecha_Resolucion !== null){
          res.result.Fecha_Resolucion = res.result.Fecha_Resolucion.split('T')[0];
        }
        if(res.result.Fecha_Notificacion !== null){
          res.result.Fecha_Notificacion = res.result.Fecha_Notificacion.split('T')[0];
        }
        this.form.patchValue(res.result);
        this.revocatoriaDirecta = res.result;
      });

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
      this.expedienteService.getExpedienteTabla(res).subscribe((res)=>{
        this.expedientetabla.set(res);

        //this.expedientetabla = res

      })
    })
  }



  constructor(){
    this.expedienteService.getRecQuejaRevocatoria().subscribe((res:any)=>{
      this.recQuejaRevocatoriaDirecta = res;

    })

    this.expedienteService.getDecisionQuejaRevocatoria().subscribe((res:any)=>{
      this.decisionQuejaRevocatoria = res;
    })

  }

  form = new FormGroup({
    Recurso_Queja_Revoc_Id: new FormControl(null),
    No_Radicado: new FormControl(null),
    Fecha_Radicado: new FormControl(null),
    No_Resolucion: new FormControl(null),
    Fecha_Resolucion: new FormControl(null),
    Fecha_Notificacion: new FormControl(null),
    Decision_Queja_Revoc_Id: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const RecursoRevocatoriaDirecta = {
      Expediente_Id: this.expediente.Id,
      Recurso_Queja_Revoc_Id: Number(this.form.value.Recurso_Queja_Revoc_Id),
      No_Radicado: this.form.value.No_Radicado,
      Fecha_Radicado: this.form.value.Fecha_Radicado,
      No_Resolucion: this.form.value.No_Resolucion,
      Fecha_Resolucion: this.form.value.Fecha_Resolucion,
      Fecha_Notificacion: this.form.value.Fecha_Notificacion,
      Decision_Queja_Revoc_Id: Number(this.form.value.Decision_Queja_Revoc_Id),
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarRecQuejaRevocatoria(RecursoRevocatoriaDirecta).subscribe({
       next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });


  }




}
