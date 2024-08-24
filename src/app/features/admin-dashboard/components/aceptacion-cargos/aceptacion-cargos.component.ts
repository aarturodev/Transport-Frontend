import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-aceptacion-cargos',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, TablaExpedienteComponent],
  templateUrl: './aceptacion-cargos.component.html',
  styleUrl: './aceptacion-cargos.component.css'
})
export default class AceptacionCargosComponent {


  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);


  expediente:any = {}
  expedientetabla = signal({});

  Rol = this.loginService.getRole();


  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarAceptacionCargos(res).subscribe((res:any)=>{
        if(res.result.Fecha_Radicado !== null){
          res.result.Fecha_Radicado = new Date(res.result.Fecha_Radicado).toISOString().split('T')[0];
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



  form = new FormGroup({
    Numero_Radicado: new FormControl(null),
    Fecha_Radicado: new FormControl(null),

  })

  actualizarAceptacion(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const AceptacionCargos = {
      Expediente_Id: this.expediente.Id,
      Numero_Radicado: this.form.value.Numero_Radicado,
      Fecha_Radicado: this.form.value.Fecha_Radicado,
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }
    this.expedienteService.actualizarAceptacionCargos(AceptacionCargos).subscribe({
       next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    });




  }


}
