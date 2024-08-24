import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteService } from '@core/services/expediente.service';
import { LoginService } from '@core/services/login.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TablaExpedienteComponent } from '../expediente/components/tabla/tabla-expediente/tabla-expediente.component';

@Component({
  selector: 'app-pago-valor',
  standalone: true,
  templateUrl: './pago-valor.component.html',
  styleUrls: ['./pago-valor.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, TablaExpedienteComponent]
})
export default class PagoValorComponent implements OnInit {



  private http = inject(ExpedienteService)
  private expedienteService = inject(ExpedienteService)
  private loginService = inject(LoginService);

  Rol = this.loginService.getRole();

  expediente:any = {}
  expedientetabla = signal({});

  ngOnInit(): void {
    this.expedienteService.expediente$.subscribe((res:any)=>{
      this.expedienteService.buscarPagoValor(res).subscribe((res:any)=>{
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




  form = new FormGroup({
    Recibo_Pago: new FormControl(null),
    Valor: new FormControl(null),

  })

  crearExpediente(){
    if(!this.form.valid){
      console.log("el formulario no es valido");
      return
    }

    const PagoValor = {
      Expediente_Id: this.expediente.Id,
      Recibo_Pago:this.form.value.Recibo_Pago,
      Valor: Number(this.form.value.Valor),
      Usuario_Id : Number(this.loginService.getUser()),
      Ultima_Modificacion: this.http.getDate()

    }

    this.expedienteService.actualizarPagoValor(PagoValor).subscribe({
       next: (res)=>{
        this.expedienteService.getExpedienteTabla(this.expediente.Numero_Expediente).subscribe((res)=>{
        this.expedientetabla.set(res);
        console.log('update tabla', res);
        })
      }
    })

  }



}
