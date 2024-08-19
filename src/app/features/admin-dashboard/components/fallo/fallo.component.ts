import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-fallo',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './fallo.component.html',
  styleUrl: './fallo.component.css'
})
export default class FalloComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  sentidoFallo:any = [];
  expediente:any = {}
  fallo:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarFallo(res).subscribe((res:any)=>{
        this.fallo = res.result;

        if(res.result.Fecha_Resolucion !== null){
          res.result.Fecha_Resolucion = res.result.Fecha_Resolucion.split('T')[0];
        }
        if(res.result.Fecha_Notificacion !== null){
          res.result.Fecha_Notificacion = res.result.Fecha_Notificacion.split('T')[0];
        }
        if(res.result.Fecha_Max_Para_Recursos !== null){
          res.result.Fecha_Max_Para_Recursos = res.result.Fecha_Max_Para_Recursos.split('T')[0];
        }
        if(res.result.Fecha_Radicado_Contra_Fallo !== null){
          res.result.Fecha_Radicado_Contra_Fallo = res.result.Fecha_Radicado_Contra_Fallo.split('T')[0];
        }
        this.form.patchValue(res.result);
      });

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }



  constructor(){
    this.http.getSentidoFallo().subscribe((res:any)=>{
      this.sentidoFallo = res
    })

  }

  form = new FormGroup({
    Numero_Resolucion: new FormControl(null),
    Fecha_Resolucion : new FormControl(null),
    Sentido_Fallo_Id: new FormControl(null),
    Valor_Sancion: new FormControl(null),
    Fecha_Notificacion: new FormControl(null),
    Fecha_Max_Para_Recursos : new FormControl(null),
    Numero_Radicado_Contra_Fallo: new FormControl(null),
    Fecha_Radicado_Contra_Fallo: new FormControl(null)
  })

  ActualizarFallo(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Fallo = {
      Numero_Resolucion: this.form.value.Numero_Resolucion,
      Fecha_Resolucion: this.form.value.Fecha_Resolucion,
      Sentido_Fallo_Id: Number(this.form.value.Sentido_Fallo_Id),
      Valor_Sancion: this.form.value.Valor_Sancion,
      Fecha_Notificacion: this.form.value.Fecha_Notificacion,
      Fecha_Max_Para_Recursos: this.form.value.Fecha_Max_Para_Recursos,
      Numero_Radicado_Contra_Fallo: this.form.value.Numero_Radicado_Contra_Fallo,
      Fecha_Radicado_Contra_Fallo: this.form.value.Fecha_Radicado_Contra_Fallo,
      Expediente_Id: Number(this.expediente.Id),
      Ultima_Modificacion: this.http.getDate(),
      Usuario_Id: Number(this.loginService.getUser())

    }
    this.expedienteService.actualizarFallo(Fallo).subscribe();
    console.log(Fallo);


  }


}
