import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css'
})
export default class EstadoComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  tipoEstado :any[] = []
  estado : any = {}
  expediente:any = {}
  expedientetabla = signal({});
  isDisabled = true;

   ngOnInit(): void {
     this.expedienteService.expediente$.subscribe((res:any)=>{
        this.expedienteService.buscarEstado(res).subscribe((res:any)=>{
          this.estado = res.result;
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
    this.expedienteService.getTipoEstado().subscribe((res)=>{
      this.tipoEstado = res
    })
  }





  form = new FormGroup({
    Tipo_Estado_Id: new FormControl(null)

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const Estado = {
      Expediente_Id: this.expediente.Id,
      Tipo_Estado_Id: Number(this.form.value.Tipo_Estado_Id),
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }
    this.expedienteService.actualizarEstado(Estado).subscribe({
       next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });


  }


}
