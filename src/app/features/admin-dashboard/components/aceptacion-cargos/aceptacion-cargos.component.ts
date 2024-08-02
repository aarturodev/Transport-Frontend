import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-aceptacion-cargos',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './aceptacion-cargos.component.html',
  styleUrl: './aceptacion-cargos.component.css'
})
export default class AceptacionCargosComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);


  motivoInvestigacion:MotivoInvestigacion[] = [];
  conducta:Conducta[] = [];
  modalidadServicio:ModalidadServicio[] = [];
  tipoServicio:TipoServicio[] = [];
  sujetoSancionable:SujetoSancionable[] = [];
  tipoPersonaNatural:TipoPersonaNatural[] = [];
  expediente:any = {}
  aceptacionCargos:any = {}

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarAceptacionCargos(res).subscribe((res:any)=>{
        if(res.result.Fecha_Radicado !== null){
          res.result.Fecha_Radicado = new Date(res.result.Fecha_Radicado).toISOString().split('T')[0];
        }
        this.aceptacionCargos = res.result;
        this.form.patchValue(res.result);

      })

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
    })
  }



  form = new FormGroup({
    Numero_Radicado: new FormControl(null),
    Fecha_Radicado: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const AceptacionCargos = {
      Expediente_Id: this.expediente.Id,
      Numero_Radicado: this.form.value.Numero_Radicado,
      Fecha_Radicado: this.form.value.Fecha_Radicado,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }
    this.expedienteService.actualizarAceptacionCargos(AceptacionCargos).subscribe();




  }


}
