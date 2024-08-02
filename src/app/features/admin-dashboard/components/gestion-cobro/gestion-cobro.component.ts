import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-gestion-cobro',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './gestion-cobro.component.html',
  styleUrl: './gestion-cobro.component.css'
})
export default class GestionCobroComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  gestionCobro:any = {}
  expediente:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarGestionCobro(res).subscribe((res:any)=>{
        if(res.result.Fecha_Envio != null){
          res.result.Fecha_Envio = res.result.Fecha_Envio.split("T")[0];
        }
        this.form.patchValue(res.result);
        this.gestionCobro = res.result;
      })
      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }



  form = new FormGroup({
    Fecha_Envio: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const GestionCobro = {
      Expediente_Id: this.expediente.Id,
      Fecha_Envio: this.form.value.Fecha_Envio,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarGestionCobro(GestionCobro).subscribe();

  }


}
