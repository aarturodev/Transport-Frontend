import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css'
})
export default class PruebasComponent {


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
  pruebas:any = {}

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
        this.pruebas = res.result;
        this.form.patchValue(this.pruebas);
      })

      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
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

    this.expedienteService.actualizarPruebas(Pruebas).subscribe();

  }



}
