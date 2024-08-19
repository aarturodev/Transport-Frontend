import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-recurso-primera-instancia',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './recurso-primera-instancia.component.html',
  styleUrl: './recurso-primera-instancia.component.css'
})
export default class RecursoPrimeraInstanciaComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();


  desicion: any = []
  tipoRecurso: any = []
  recursoPrimeraInstancia: any = {}
  expediente:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarRecursoPrimeraInstancia(res).subscribe((res:any)=>{

        if(res.result.Fecha_Resolucion !== null){
          res.result.Fecha_Resolucion = res.result.Fecha_Resolucion.split("T")[0];
        }
        if(res.result.Fecha_Notificacion !== null){
          res.result.Fecha_Notificacion = res.result.Fecha_Notificacion.split("T")[0];
        }
        this.recursoPrimeraInstancia = res;
        this.form.patchValue(res.result);
      })
      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }



  constructor(){
    this.expedienteService.getDesicion().subscribe((res:any)=>{
      this.desicion = res;
    })

    this.expedienteService.getTipoRecurso().subscribe((res:any)=>{
      this.tipoRecurso = res;
    })
  }

  form = new FormGroup({
    Tipo_Recurso_Id: new FormControl(null),
    No_Resolucion_Recurso: new FormControl(null),
    Fecha_Resolucion: new FormControl(null),
    Fecha_Notificacion: new FormControl(null),
    Decision_Id: new FormControl(null),
    Valor_Sancion_Modificado: new FormControl(null),
  })

  actualizarRecursoPrimeraInstancia(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const RecursoPrimeraInstancia = {
      Expediente_Id : this.expediente.Id,
      Tipo_Recurso_Id : Number(this.form.value.Tipo_Recurso_Id),
      No_Resolucion_Recurso : this.form.value.No_Resolucion_Recurso,
      Fecha_Resolucion : this.form.value.Fecha_Resolucion,
      Fecha_Notificacion : this.form.value.Fecha_Notificacion,
      Decision_Id : Number(this.form.value.Decision_Id),
      Valor_Sancion_Modificado : this.form.value.Valor_Sancion_Modificado,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }
    this.expedienteService.actualizarRecursoPrimeraInstancia(RecursoPrimeraInstancia).subscribe();

  }


}
