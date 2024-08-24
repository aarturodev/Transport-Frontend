import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-ajuste-derecho-aclaratorio',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './ajuste-derecho-aclaratorio.component.html',
  styleUrl: './ajuste-derecho-aclaratorio.component.css'
})
export default class AjusteDerechoAclaratorioComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  tipoResolucion:any = []
  ajusteDerechoAclaratorio:any = {}
  expediente:any = {}
  expedientetabla = signal({});

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarAjusteDerechoAclaratorio(res).subscribe((res:any)=>{
        if(res.result.Fecha_Resolucion !== null){
          res.result.Fecha_Resolucion = res.result.Fecha_Resolucion.split('T')[0];
        }
        if(res.result.Fecha_Fecha_Notificacion !== null){
          res.result.Fecha_Fecha_Notificacion = res.result.Fecha_Fecha_Notificacion.split('T')[0];
        }
        this.form.patchValue(res.result);
        this.ajusteDerechoAclaratorio = res.result;
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

    this.expedienteService.getTipoResolucion().subscribe((res:any)=>{
      this.tipoResolucion = res;
    })


  }

  form = new FormGroup({
    Tipo_Resolucion_Id: new FormControl(null),
    No_Resolucion: new FormControl(null),
    Fecha_Resolucion: new FormControl(null),
    Fecha_Fecha_Notificacion: new FormControl(null),

  })

  actualizarAjusteDerecho(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const AjusteDerechoAclaratorio = {
      Expediente_Id : this.expediente.Id,
      Tipo_Resolucion_Id : Number(this.form.value.Tipo_Resolucion_Id),
      No_Resolucion : this.form.value.No_Resolucion,
      Fecha_Resolucion : this.form.value.Fecha_Resolucion,
      Fecha_Fecha_Notificacion : this.form.value.Fecha_Fecha_Notificacion,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarAjusteDerechoAclaratorio(AjusteDerechoAclaratorio).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });

  }



}
