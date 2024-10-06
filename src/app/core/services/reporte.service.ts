import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  http = inject(HttpClient)

  getReporte(expediente:string, estado:string, sujeto:string){
    const apiUrl = environment.apiUrl;
    const url = apiUrl+'reporte/';
    return this.http.get(url, {params:{expediente, estado, sujeto}, responseType: 'blob'});
  }

  verificarReporte(data: any){
    const apiUrl = environment.apiUrl;
    const url = apiUrl+'reporte/';
    return this.http.post(url, data);
  }
}
