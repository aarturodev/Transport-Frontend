import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReporteService } from '@core/services/reporte.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Reporte',
  templateUrl: './Reporte.component.html',
  standalone: true,
  styleUrls: ['./Reporte.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule],
})
export default class ReporteComponent {
  flag = false;
  descargar = false;
  expediente = '';
  estado = '';
  sujeto = '';
  iuit = '';
  Resolucion = '';
  Placa = '';

  reporteService = inject(ReporteService)

  form = new FormGroup({
    TipoBusqueda: new FormControl('', Validators.required),
    Numero_Busqueda: new FormControl('', Validators.required),
    Nombre_Solicitante: new FormControl('', Validators.required),
    Nit_Solicitante: new FormControl('', Validators.required),
  });

  volver() {
    this.descargar = false;
  }

  Buscar() {
    if (this.form.invalid) {
      this.flag = true;
    } else {
      this.flag = false;
      console.log(this.form.value);

      this.reporteService.verificarReporte(this.form.value).subscribe({
        next: (res:any)=>{
          console.log("responses: ",res);
           this.expediente = res.result?.expediente;
            this.estado = res.result?.estado;
            this.sujeto = res?.sujeto;
            this.iuit = res.result?.IUIT;
            this.Resolucion = res.result?.Numero_Resolucion;
            this.Placa = res.result?.placa;
       
          if(res.result.success === null){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.result.message,
              timer: 4000,
              showConfirmButton: false,
            });
          }
          
          
          if(res.result.success == true){
    
            this.descargar = true;
        
            if(res.verificacion.length > 0){
               Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: res.result.message,
              timer: 4000,
              showConfirmButton: false,
            });
            }
            else{
              this.descargar = false;
              Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'el sujeto no esta vinculado en el expediente',
              timer: 4000,
              showConfirmButton: false,
            });
            }
           
          }
          else{
            if(res.result.success == false && res.verificacion.length > 0){
              this.descargar = true;
              Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: res.result.message,
              timer: 4000,
              showConfirmButton: false,
            });

            }
            if(res.verificacion.length > 0){
              this.descargar = true;
              Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: res.result.message,
              timer: 4000,
              showConfirmButton: false,
            });
            }else{
              this.descargar = false;
              Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'el sujeto no esta vinculado en el expediente',
              timer: 4000,
              showConfirmButton: false,
            });

            }
    
          }
        },
        error: (err:any)=>{
          console.log("error: ",err);
        }
      });
        
    }
  }


  downloadPDF(expediente: any, estado: any, sujeto:any, iuit: any, Resolucion: any, Placa:any) {
    this.reporteService.getReporte(expediente,estado, sujeto, iuit, Resolucion, Placa ).subscribe({
      next: (response: any) => {
      const blob = new Blob([response], { type: 'application/docx' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    error: (error) => {
      console.error('Error al descargar el PDF: ', error);  
    }
    });

  }

}
