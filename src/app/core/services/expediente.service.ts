import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private Url = 'http://localhost:3000/expediente';

  private http = inject(HttpClient)


  // informacion de los expedientes

  getMotivoInvestigacion(){
    return this.http.get(`${this.Url}/motivo-investigacion`);
  }

  getConducta(){
    return this.http.get(`${this.Url}/conducta`);
  }

  getModalidadServicio(){
    return this.http.get(`${this.Url}/modalidad-servicio`);
  }

  getTipoServicio(){
    return this.http.get(`${this.Url}/tipo-servicio`);
  }

  getSujetoSancionable(){
    return this.http.get(`${this.Url}/sujeto-sancionable`);
  }

  getTipoPersonaNatural(){
    return this.http.get(`${this.Url}/tipo-persona-natural`);
  }

}
