import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-ejecutoria',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './ejecutoria.component.html',
  styleUrl: './ejecutoria.component.css'
})
export default class EjecutoriaComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);


  ejecutoria:any = {}
  expediente:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarEjecutoria(res).subscribe((res:any)=>{
        if(res.result.Fecha_Ejecutoria != null){
          res.result.Fecha_Ejecutoria = res.result.Fecha_Ejecutoria.split("T")[0];
        }
        this.form.patchValue(res.result);
        this.ejecutoria = res.result;
      })
      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }


  form = new FormGroup({
    Fecha_Ejecutoria: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Ejecutoria = {
      Expediente_Id: this.expediente.Id,
      Fecha_Ejecutoria: this.form.value.Fecha_Ejecutoria,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarEjecutoria(Ejecutoria).subscribe();

  }


}
