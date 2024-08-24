import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-inhibitorio',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './inhibitorio.component.html',
  styleUrl: './inhibitorio.component.css'
})
export default class InhibitorioComponent {

  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);
  private router = inject(Router)

  Rol = this.loginService.getRole();


  motivoInvestigacion:MotivoInvestigacion[] = [];
  conducta:Conducta[] = [];
  modalidadServicio:ModalidadServicio[] = [];
  tipoServicio:TipoServicio[] = [];
  sujetoSancionable:SujetoSancionable[] = [];
  tipoPersonaNatural:TipoPersonaNatural[] = [];
  expediente:any = {}
  inhibitorio:any = {}
  expedientetabla = signal({});

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{

      this.expedienteService.buscarInibitorio(res).subscribe((res:any)=>{

        if(res.result.Fecha_Resolucion !== null){
           res.result.Fecha_Resolucion = new Date(res.result.Fecha_Resolucion).toISOString().split('T')[0];
        }
        if(res.result.Fecha_Comunicacion !== null){
          res.result.Fecha_Comunicacion = new Date(res.result.Fecha_Comunicacion).toISOString().split('T')[0];
        }
        this.inhibitorio = res.result;
        this.form.patchValue(this.inhibitorio);
      });

       this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
        this.expediente = res.result;
      });
       this.expedienteService.getExpedienteTabla(res).subscribe((res)=>{
        this.expedientetabla.set(res);

        //this.expedientetabla = res

      })


    })
  }


  form = new FormGroup({
    Numero_Resolucion : new FormControl(null),
    Fecha_Resolucion : new FormControl(null),
    Fecha_Comunicacion : new FormControl(null),

  })


  actualizarInibitorio(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const inhibitorio = {
      ...this.form.value,
      Expediente_Id : this.expediente.Id,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion : this.expedienteService.getDate(),
    }
    console.log(inhibitorio);
    this.expedienteService.actualizarInhibitorio(inhibitorio).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });

  }



}
