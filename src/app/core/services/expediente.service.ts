import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conducta, ModalidadServicio, MotivoInvestigacion, SujetoSancionable, TipoPersonaNatural, TipoServicio } from '@core/models/Expediente';
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap, throwError } from 'rxjs';

import Swal from 'sweetalert2';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private Url = 'http://localhost:3000/expediente';
  private http = inject(HttpClient)
  private router = inject(Router)
  private service = inject(LoginService)





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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Expediente creado con exito!",
          showConfirmButton: false,
          timer: 1800
        });
        localStorage.setItem("expediente", res.result);
        this.router.navigate(['/']);
      }),
      catchError((error)=>{
        alert("el expediente no se pudo crear!")
        this.router.navigate(['/']);
        return EMPTY;
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

  buscarExpediente(expediente:string):Observable<any>{

    return this.http.get<any>(`${this.Url}/${expediente}`).pipe(
      tap((res)=>{
        localStorage.setItem("expediente", res.result.Numero_Expediente);
      }),
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 404){

          Swal.fire({
          icon: "error",
          title: "Expediente no encontrado!",
          showConfirmButton: false,
          timer: 1800
        });
        const role = this.service.getRole();
        const ruta = role+"/Expedientes/Crear";

          this.router.navigate([ruta]);
        }
        return EMPTY;
      })
    )
  }

  actualizarExpediente(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el expediente",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-expediente`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Expediente actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  buscarApertura(expediente:string):Observable<any>{

    return this.http.get<any>(`${this.Url}/apertura/${expediente}`);

  }
  actualizarApertura(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el expediente",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-apertura`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Expediente actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                observer.complete();
              }
            });
          });
  }


  buscarInibitorio(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/inhibitorio/${expediente}`);
  }
  actualizarInhibitorio(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el inhibitorio",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-inhibitorio`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Inhibitorio actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  buscarPruebas(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/pruebas/${expediente}`);
  }
  actualizarPruebas(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el Pruebas",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-Pruebas`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Pruebas actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  buscarAceptacionCargos(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/aceptacion-cargos/${expediente}`);
  }

  actualizarAceptacionCargos(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar la Aceptacion de Cargos",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-aceptacion-cargos`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Aceptacion de Cargos actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  getSentidoFallo(): Observable<any> {
    return this.http.get<any>(`${this.Url}/sentido-fallo`);
  }

  buscarFallo(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/fallo/${expediente}`);
  }

  actualizarFallo(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el Fallo",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-fallo`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Fallo actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  getDesicion(): Observable<any> {
    return this.http.get<any>(`${this.Url}/decision`);
  }
  getTipoRecurso(): Observable<any> {
    return this.http.get<any>(`${this.Url}/tipo-recurso`);
  }

  buscarRecursoPrimeraInstancia(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/recurso-primera-instancia/${expediente}`);
  }

  actualizarRecursoPrimeraInstancia(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el Recurso de Primera Instancia",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-recurso-primera-instancia`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Recurso de Primera Instancia actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  getDecisionSegundaInstancia(): Observable<any> {
    return this.http.get<any>(`${this.Url}/decision-segunda-instancia`);
  }

  buscarRecursoSegundaInstancia(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/recurso-segunda-instancia/${expediente}`);
  }

  actualizarRecursoSegundaInstancia(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el Recurso de Segunda Instancia",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-recurso-segunda-instancia`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Recurso de Segunda Instancia actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  getRecQuejaRevocatoria(): Observable<any> {
    return this.http.get<any>(`${this.Url}/rec-queja-revocatoria`);
  }

  getDecisionQuejaRevocatoria(): Observable<any> {
    return this.http.get<any>(`${this.Url}/des-queja-revocatoria`);
  }

  buscarRecQuejaRevocatoria(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/queja-revocatoria/${expediente}`);
  }

  actualizarRecQuejaRevocatoria(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el Recurso de Queja Revocatoria",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-queja-revocatoria`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Recurso de Queja Revocatoria actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  buscarEjecutoria(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/ejecutoria/${expediente}`);
  }

  actualizarEjecutoria(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar la Ejecutoria",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-ejecutoria`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Ejecutoria actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  buscarGestionCobro(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/gestion-cobro/${expediente}`);
  }

  actualizarGestionCobro(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar la Gestion de Cobro",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-gestion-cobro`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Gestion de Cobro actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }

  getTipoResolucion(): Observable<any> {
    return this.http.get<any>(`${this.Url}/tipo-resolucion`);
  }

  buscarAjusteDerechoAclaratorio(expediente:string):Observable<any>{
    return this.http.get<any>(`${this.Url}/ajuste-derecho-aclaratorio/${expediente}`);
  }

  actualizarAjusteDerechoAclaratorio(expediente: any): Observable<any> {
      return new Observable(observer => {
          Swal.fire({
              title: "¿Estás seguro?",
              text: "Estás a punto de actualizar el Ajuste Derecho Aclaratorio",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!",
              cancelButtonText: "Cancelar"
          }).then((result: any) => {
              if (result.isConfirmed) {
                  this.http.patch<any>(`${this.Url}/actualizar-ajuste-derecho-aclaratorio`, expediente).subscribe(
                      res => {
                          Swal.fire({
                              title: 'Actualizado!',
                              text: 'Ajuste Derecho Aclaratorio actualizado con exito!',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1800
                          });
                          observer.next(res);
                          observer.complete();
                      },
                      err => {
                          observer.error(err);
                      }
                  );
              } else {
                  observer.complete();
              }
          });
      });
  }














  getExpediente(){
    return localStorage.getItem("expediente")
  }

  private dataSource = new BehaviorSubject<string>("");
  expediente$: Observable<string> = this.dataSource.asObservable();

  changeData(data: string) {
    localStorage.setItem("expediente", data);
    this.dataSource.next(data);
  }


}
