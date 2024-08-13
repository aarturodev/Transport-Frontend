import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MotivoInvestigacion, Conducta, ModalidadServicio, TipoServicio, SujetoSancionable, TipoPersonaNatural } from '@core/models/Expediente';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css'
})
export default class EstadoComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  tipoEstado :any[] = []
  estado : any = {}
  expediente:any = {}

   ngOnInit(): void {
     this.expedienteService.expediente$.subscribe((res:any)=>{
        this.expedienteService.buscarEstado(res).subscribe((res:any)=>{
          this.estado = res.result;
          this.form.patchValue(res.result);
        })
       this.expedienteService.buscarExpediente(res).subscribe((res:any)=>{
         this.expediente = res.result;
       });
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
    this.expedienteService.actualizarEstado(Estado).subscribe();


  }


}
