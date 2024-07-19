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


  /**
   * Funcion que permite obtener los motivos de investigacion
   * @returns MotivoInvestigacion[]
   */
  getMotivoInvestigacion(): Observable<MotivoInvestigacion[]>{
    return this.http.get<MotivoInvestigacion[]>(`${this.Url}/motivo-investigacion`);
  }

  /**
   * Funcion que permite obtener las conductas
   * @returns Conducta[]
   */
  getConducta(): Observable<Conducta[]>{
    return this.http.get<Conducta[]>(`${this.Url}/conducta`);

  }

  /**
   * Funcion que permite obtener las modalidades de servicio
   * @returns ModalidadServicio[]
   */
  getModalidadServicio(): Observable<ModalidadServicio[]>{
    return this.http.get<ModalidadServicio[]>(`${this.Url}/modalidad-servicio`);
  }

  /**
   * Funcion que permite obtener los tipos de servicio
   * @returns TipoServicio[]
   */
  getTipoServicio(): Observable<TipoServicio[]>{
    return this.http.get<TipoServicio[]>(`${this.Url}/tipo-servicio`);
  }

  /**
   * Funcion que permite obtener los sujetos sancionables
   * @returns SujetoSancionable[]
   */
  getSujetoSancionable(): Observable<SujetoSancionable[]>{
    return this.http.get<SujetoSancionable[]>(`${this.Url}/sujeto-sancionable`);
  }

  /**
   * Funcion que permite obtener los tipos de persona natural
   * @returns TipoPersonaNatural[]
   */
  getTipoPersonaNatural(): Observable<TipoPersonaNatural[]>{
    return this.http.get<TipoPersonaNatural[]>(`${this.Url}/tipo-persona-natural`);
  }

}
