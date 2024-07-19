import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conducta, ModalidadServicio, MotivoInvestigacion, SujetoSancionable, TipoPersonaNatural, TipoServicio } from '@core/models/Expediente';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private Url = 'http://localhost:3000/expediente';
  private http = inject(HttpClient)
  private router = inject(Router)





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

  crearExpediente(expediente: any): Observable<any>{
    return this.http.post<any>(`${this.Url}/crear-expediente`, expediente,{withCredentials:true}).pipe(
      tap((res)=>{
        this.changeData(res.result)
        localStorage.setItem("expediente", res.result);
        this.router.navigate(['/']);
      })
    );
  }

  getDate(): string{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  getExpedienteById(expediente:number):Observable<any>{
    return this.http.get<any>(`${this.Url}/${expediente}`).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 404){
          alert("el expediente no existe!")
        }
        return EMPTY;
      })
    )
  }

  buscarExpediente(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/${expediente}`).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 404){
          alert("el expediente no existe!")
        }
        return EMPTY;
      })
    )
  }

  getExpediente(){
    return localStorage.getItem("expediente")
  }

  private dataSource = new BehaviorSubject<string>("");
  expediente = this.dataSource.asObservable();

  changeData(data: string) {
    this.dataSource.next(data);
  }


}
