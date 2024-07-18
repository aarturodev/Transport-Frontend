import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Conducta, ModalidadServicio, MotivoInvestigacion, SujetoSancionable, TipoPersonaNatural, TipoServicio } from '@core/models/Expediente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private Url = 'http://localhost:3000/expediente';

  private http = inject(HttpClient)


  // informacion de los expedientes

  getMotivoInvestigacion(): Observable<MotivoInvestigacion[]>{
    return this.http.get<MotivoInvestigacion[]>(`${this.Url}/motivo-investigacion`);
  }

  getConducta(): Observable<Conducta[]>{
    return this.http.get<Conducta[]>(`${this.Url}/conducta`);

  }

  getModalidadServicio(): Observable<ModalidadServicio[]>{
    return this.http.get<ModalidadServicio[]>(`${this.Url}/modalidad-servicio`);
  }

  getTipoServicio(): Observable<TipoServicio[]>{
    return this.http.get<TipoServicio[]>(`${this.Url}/tipo-servicio`);
  }

  getSujetoSancionable(): Observable<SujetoSancionable[]>{
    return this.http.get<SujetoSancionable[]>(`${this.Url}/sujeto-sancionable`);
  }

  getTipoPersonaNatural(): Observable<TipoPersonaNatural[]>{
    return this.http.get<TipoPersonaNatural[]>(`${this.Url}/tipo-persona-natural`);
  }

}
