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

  ngOnInit(): void {

    const expediente = this.expedienteService.getExpediente()
    console.log("logrado: ", expediente)

    if(expediente && expediente !== null && expediente !== undefined){
      this.expedienteService.changeData(expediente);
    }


    this.expedienteService.expediente.subscribe({
      next: (res)=>{
        this.expedienteService.buscarExpediente(res).subscribe({
          next: (res)=>{
            this.expediente = res.result
          },
          error: (error)=>{
            console.log("paso algo");

          }
        })
      },
      error: (error)=>{
        alert("el expediente no existe!")
      }
    })

  }



  constructor(){

    this.http.getMotivoInvestigacion().subscribe((res:MotivoInvestigacion[])=>{
      this.motivoInvestigacion  = res;
    });

    this.http.getConducta().subscribe((res:Conducta[])=>{
      this.conducta = res;
    });

    this.http.getModalidadServicio().subscribe((res:ModalidadServicio[])=>{
      this.modalidadServicio = res;
    });

    this.http.getTipoServicio().subscribe((res:TipoServicio[])=>{
      this.tipoServicio = res;
    })

    this.http.getSujetoSancionable().subscribe((res:SujetoSancionable[])=>{
      this.sujetoSancionable = res;
    })

    this.http.getTipoPersonaNatural().subscribe((res:TipoPersonaNatural[])=>{
      this.tipoPersonaNatural = res
    })



  }

  form = new FormGroup({
    Numero_Expediente : new FormControl('', Validators.required),
    Motivo_Investigacion_Id : new FormControl(null),
    Numero_Informe_Infraccion : new FormControl(null),
    Fecha_Hechos : new FormControl(null),
    Fecha_Caducidad : new FormControl(null),
    Placa : new FormControl(null),
    Clase_Infraccion_Id : new FormControl(null),
    Modalidad_Servicio_Id : new FormControl(null),
    Tipo_Servicio_Id : new FormControl(null),
    Sujeto_Sancionable_Id : new FormControl(null),
    Tipo_Persona_Natural_Id : new FormControl(null),
    Nombre_Persona_Natural : new FormControl(null),
    Identificacion : new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Expediente = {
      Numero_Expediente : this.form.value.Numero_Expediente,
      Motivo_Investigacion_Id : this.form.value.Motivo_Investigacion_Id ? Number(this.form.value.Motivo_Investigacion_Id) : null,
      Numero_Informe_Infraccion : this.form.value.Numero_Informe_Infraccion,
      Fecha_Hechos : this.form.value.Fecha_Hechos,
      Fecha_Caducidad : this.form.value.Fecha_Caducidad,
      Placa : this.form.value.Placa,
      Clase_Infraccion_Id : this.form.value.Clase_Infraccion_Id ? Number(this.form.value.Clase_Infraccion_Id) : null,
      Modalidad_Servicio_Id : this.form.value.Modalidad_Servicio_Id ? Number(this.form.value.Modalidad_Servicio_Id) : null,
      Tipo_Servicio_Id : this.form.value.Tipo_Servicio_Id ? Number(this.form.value.Tipo_Servicio_Id) : null,
      Sujeto_Sancionable_Id : this.form.value.Sujeto_Sancionable_Id ? Number(this.form.value.Sujeto_Sancionable_Id): null,
      Tipo_Persona_Natural_Id : this.form.value.Tipo_Persona_Natural_Id ? Number(this.form.value.Tipo_Persona_Natural_Id) : null,
      Identificacion: this.form.value.Identificacion ? Number(this.form.value.Identificacion) : null,
      Nombre_Persona_Natural: this.form.value.Nombre_Persona_Natural,
      Usuario_Id : this.loginService.getUser(),
      Ultima_Modificacion: this.http.getDate()

    }

    this.http.crearExpediente(Expediente).subscribe()

  }



}
