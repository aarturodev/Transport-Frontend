import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-recurso-segunda-instancia',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './recurso-segunda-instancia.component.html',
  styleUrl: './recurso-segunda-instancia.component.css'
})
export default class RecursoSegundaInstanciaComponent {



  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();


  decisionSegundaInstancia:any = []
  recursoSegundaInstancia:any = {}
  expediente:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarRecursoSegundaInstancia(res).subscribe((res:any)=>{

        if(res.result.Fecha_Envio_Segunda_Inst != null){
          res.result.Fecha_Envio_Segunda_Inst = res.result.Fecha_Envio_Segunda_Inst.split('T')[0];
        }
        if(res.result.Fecha_Resolucion_Rec_Apel != null){
          res.result.Fecha_Resolucion_Rec_Apel = res.result.Fecha_Resolucion_Rec_Apel.split('T')[0];
        }
        if(res.result.Fecha_Notificacion_Resolucion_Rec_Apel != null){
          res.result.Fecha_Notificacion_Resolucion_Rec_Apel = res.result.Fecha_Notificacion_Resolucion_Rec_Apel.split('T')[0];
        }
        if(res.result.Fecha_Devolucion != null){
          res.result.Fecha_Devolucion = res.result.Fecha_Devolucion.split('T')[0];
        }
        this.form.patchValue(res.result)
        this.recursoSegundaInstancia = res.result;

      });

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }



  constructor(){
    this.expedienteService.getDecisionSegundaInstancia().subscribe((res:any)=>{
      this.decisionSegundaInstancia = res;

    })
  }

  form = new FormGroup({
    Fecha_Envio_Segunda_Inst: new FormControl(null),
    No_Memorando_Envio: new FormControl(null),
    No_Resolucion_Recurso_Apelacion: new FormControl(null),
    Fecha_Resolucion_Rec_Apel: new FormControl(null),
    Fecha_Notificacion_Resolucion_Rec_Apel: new FormControl(null),
    Decision_Seg_Instatancia_Id: new FormControl(null),
    Fecha_Devolucion: new FormControl(null),
    Valor_Sancion_Modificado: new FormControl(null),
    No_Resol_Silencio_Administrativo: new FormControl(null),

  })

  actualizarRecursoSegundaInstancia(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const RecursoSegundaInstancia = {
      Expediente_Id : this.expediente.Id,
      Fecha_Envio_Segunda_Inst: this.form.value.Fecha_Envio_Segunda_Inst,
      No_Memorando_Envio: this.form.value.No_Memorando_Envio,
      No_Resolucion_Recurso_Apelacion: this.form.value.No_Resolucion_Recurso_Apelacion,
      Fecha_Resolucion_Rec_Apel: this.form.value.Fecha_Resolucion_Rec_Apel,
      Fecha_Notificacion_Resolucion_Rec_Apel: this.form.value.Fecha_Notificacion_Resolucion_Rec_Apel,
      Decision_Seg_Instatancia_Id: Number(this.form.value.Decision_Seg_Instatancia_Id),
      Fecha_Devolucion: this.form.value.Fecha_Devolucion,
      Valor_Sancion_Modificado: this.form.value.Valor_Sancion_Modificado,
      No_Resol_Silencio_Administrativo: this.form.value.No_Resol_Silencio_Administrativo,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }
    this.expedienteService.actualizarRecursoSegundaInstancia(RecursoSegundaInstancia).subscribe();


  }



}
