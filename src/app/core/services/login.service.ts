import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient)
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000';
  private tokenKey = 'access-token';
  private _isRefreshing = false;


  // setter de la variable isRefreshing
  set isRefreshing(value){
    this._isRefreshing = value;
  }

  // getter de la variable isRefreshing
  get isRefreshing(){
    return this._isRefreshing;
  }

  /**
   * Funcion que permite hacer login
   * @param credentials credenciales del usuario, email y password
   * @returns access token y lo guarda en el local storage
   * @returns refresh token y lo guarda en una cookie
   */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(response => {
        const token = response.token;
        this.setToken(token);
      })
    );
  }

  /**
   * Funcion que permite hacer logout
   * @returns elimina la cookie del refresh token y elimina el access token del local storage
   */
  logout(): void {
    this.http.post<any>(`${this.apiUrl}/logout`, {},{ withCredentials: true }).subscribe((res)=>{
      console.log(res.message);

      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/login'])
    });
  }

  /**
   * Funcion que permite refrescar el token
   * @returns access token nuevo
   */
  refresToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/refresh`, { withCredentials: true});
  }

  /**
   * Funcion que permite guardar el token en el local storage
   * @param token access token
   */
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Funcion que permite obtener el access token del local storage
   * @returns access token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Funcion que permite obtener el rol del usuario
   * @returns rol del usuario
   * @returns null si no hay token
   */
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user.Rol;
    }
    return null;
  }

  /**
   * Funcion que permite saber si el usuario esta autenticado
   * @returns true si el access token existe
   * @returns false si no existe
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }




}
