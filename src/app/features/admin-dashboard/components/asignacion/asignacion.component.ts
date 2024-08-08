import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export default class AsignacionComponent {



  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);


  asignacion : any = {}
  expediente:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarAsignacion(res).subscribe((res:any)=>{
        if(res.result.Fecha_Asignacion !== null){
          res.result.Fecha_Asignacion = res.result.Fecha_Asignacion.split('T')[0];
        }
        this.asignacion = res.result;
        this.form.patchValue(res.result);
      })
      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }




  form = new FormGroup({
    Nombre_Abogado: new FormControl(null),
    Fecha_Asignacion: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Expediente = {
      Expediente_Id: this.expediente.Id,
      Nombre_Abogado: this.form.value.Nombre_Abogado,
      Fecha_Asignacion: this.form.value.Fecha_Asignacion,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarAsignacion(Expediente).subscribe();

  }



}
