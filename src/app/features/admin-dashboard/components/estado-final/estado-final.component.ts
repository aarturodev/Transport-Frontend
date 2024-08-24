import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-estado-final',
  standalone: true,
  templateUrl: './estado-final.component.html',
  styleUrls: ['./estado-final.component.css'],
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent]
})
export default class EstadoFinalComponent implements OnInit {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  tipoEstadoFinal :any[] = []
  expediente:any = {}
  expedientetabla = signal({});

   ngOnInit(): void {
     this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarEstadoFinal(res).subscribe((res:any)=>{
        this.form.patchValue(res.result)

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
    this.expedienteService.getTipoEstadoFinal().subscribe((res)=>{
      this.tipoEstadoFinal = res
    })
  }





  form = new FormGroup({
    Tipo_Estado_Final_Id: new FormControl(null)

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const EstadoFinal = {
      Expediente_Id: this.expediente.Id,
      Tipo_Estado_Final_Id: Number(this.form.value.Tipo_Estado_Final_Id),
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarEstadoFinal(EstadoFinal).subscribe({
       next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });



  }


}
