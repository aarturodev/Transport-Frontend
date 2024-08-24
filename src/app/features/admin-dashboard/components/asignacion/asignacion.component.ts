import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import TablaComponent from '../expediente/components/tabla/tabla.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export default class AsignacionComponent {



  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();


  nombreAbogado: any[] = []
  asignacion : any = {}
  expediente:any = {}
  expedientetabla = signal({});

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
       this.expedienteService.getExpedienteTabla(res).subscribe((res)=>{
        this.expedientetabla.set(res);

        //this.expedientetabla = res

      })
    })
  }

  constructor(){
    this.expedienteService.getNombreAbogado().subscribe((res)=>{
      this.nombreAbogado = res
    })
  }




  form = new FormGroup({
    Nombre_Abogado_Id: new FormControl(null),
    Fecha_Asignacion: new FormControl(null),

  })

  actualizarAsignacion(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Expediente = {
      Expediente_Id: this.expediente.Id,
      Nombre_Abogado_Id: Number(this.form.value.Nombre_Abogado_Id),
      Fecha_Asignacion: this.form.value.Fecha_Asignacion,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarAsignacion(Expediente).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });

  }



}
