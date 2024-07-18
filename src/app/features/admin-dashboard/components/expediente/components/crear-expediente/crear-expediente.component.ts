import { Component, inject, OnInit } from '@angular/core';
import { Conducta, MotivoInvestigacion, SujetoSancionable, TipoPersonaNatural, TipoServicio } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { ModalidadServicio } from '../../../../../../core/models/Expediente';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-expediente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-expediente.component.html',
  styleUrl: './crear-expediente.component.css'
})
export default class CrearExpedienteComponent {

  private http = inject(ExpedienteService)

  // informacion de los expedientes
  motivoInvestigacion:MotivoInvestigacion[] = [];
  conducta:Conducta[] = [];
  modalidadServicio:ModalidadServicio[] = [];
  tipoServicio:TipoServicio[] = [];
  sujetoSancionable:SujetoSancionable[] = [];
  tipoPersonaNatural:TipoPersonaNatural[] = [];


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
    Motivo_Investigacion_Id : new FormControl(''),
    Numero_Informe_Infraccion : new FormControl(''),
    Fecha_Hechos : new FormControl(''),
    Fecha_Caducidad : new FormControl(''),
    Placa : new FormControl(''),
    Clase_Infraccion_Id : new FormControl(''),
    Modalidad_Servicio_Id : new FormControl(''),
    Tipo_Servicio_Id : new FormControl(''),
    Sujeto_Sancionable_Id : new FormControl(''),
    Tipo_Persona_Natural_Id : new FormControl(''),
    Persona_Natural_Id : new FormControl(''),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Expediente = {
      Numero_Expediente : this.form.value.Numero_Expediente,
      Motivo_Investigacion_Id : Number(this.form.value.Motivo_Investigacion_Id),
      Numero_Informe_Infraccion : this.form.value.Numero_Informe_Infraccion,
      Fecha_Hechos : this.form.value.Fecha_Hechos,
      Fecha_Caducidad : this.form.value.Fecha_Caducidad,
      Placa : this.form.value.Placa,
      Clase_Infraccion_Id : Number(this.form.value.Clase_Infraccion_Id),
      Modalidad_Servicio_Id : Number(this.form.value.Modalidad_Servicio_Id),
      Tipo_Servicio_Id : Number(this.form.value.Tipo_Servicio_Id),
      Sujeto_Sancionable_Id : Number(this.form.value.Sujeto_Sancionable_Id),
      Tipo_Persona_Natural_Id : Number(this.form.value.Tipo_Persona_Natural_Id),

    }
    console.log(Expediente);




  }




}
