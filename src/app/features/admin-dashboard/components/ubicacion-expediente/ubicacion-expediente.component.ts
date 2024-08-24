import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-ubicacion-expediente',
  standalone: true,
  templateUrl: './ubicacion-expediente.component.html',
  styleUrls: ['./ubicacion-expediente.component.css'],
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent]
})
export default class UbicacionExpedienteComponent implements OnInit {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  tipoUbicacion :any[] = []
  expediente:any = {}
  expedientetabla = signal({});

   ngOnInit(): void {
     this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarUbicacionExpediente(res).subscribe((res:any)=>{
        if(res.result.Fecha_Entrega !== null){
          res.result.Fecha_Entrega = res.result.Fecha_Entrega.split('T')[0];
        }
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
    this.expedienteService.getTipoUbicacion().subscribe((res:any)=>{
      this.tipoUbicacion = res;
    })
  }





  form = new FormGroup({
    Tipo_Ubicacion_Id: new FormControl(null),
    Fecha_Entrega: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const UbicacionExpediente = {
      Expediente_Id: this.expediente.Id,
      Tipo_Ubicacion_Id: Number(this.form.value.Tipo_Ubicacion_Id),
      Fecha_Entrega: this.form.value.Fecha_Entrega,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }
    this.expedienteService.actualizarUbicacionExpediente(UbicacionExpediente).subscribe({
      next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });



  }



}
