import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Conducta, ModalidadServicio, MotivoInvestigacion, SujetoSancionable, TipoPersonaNatural, TipoServicio } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { TablaExpedienteComponent } from './tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, TablaExpedienteComponent],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export default class TablaComponent implements OnInit{


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);
  private cd = inject(ChangeDetectorRef);

  Rol = this.loginService.getRole();


  motivoInvestigacion:MotivoInvestigacion[] = [];
  conducta:Conducta[] = [];
  modalidadServicio:ModalidadServicio[] = [];
  tipoServicio:TipoServicio[] = [];
  sujetoSancionable:SujetoSancionable[] = [];
  tipoPersonaNatural:TipoPersonaNatural[] = [];
  expediente:any = {}
  expedientetabla : any = {}


  ngOnInit(): void {
    const expediente = this.expedienteService.changeData(localStorage.getItem('expediente') || '');
    if(expediente !== undefined){
      this.expedienteService.changeData(expediente);
    }
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{

        if(res.result.Fecha_Hechos !== null){
           res.result.Fecha_Hechos = new Date(res.result.Fecha_Hechos).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Caducidad !== null){
           res.result.Fecha_Caducidad = new Date(res.result.Fecha_Caducidad).toISOString().split('T')[0];
        }

        this.expediente = res.result;
        this.form.patchValue(this.expediente);
      });

      this.expedienteService.getExpedienteTabla(res).subscribe((res)=>{
        this.expedientetabla = res

      })



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

  actualizarExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Expediente = {
      Numero_Expediente : this.expediente.Numero_Expediente,
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
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarExpediente(Expediente).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(Expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla = res
        console.log('update tabla', res);

      })
      }
    });

  }


}
