import { HttpClient} from '@angular/common/http';
import { UrlCodec } from '@angular/common/upgrade';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000';
  private tokenKey = 'access-token';

  private _isRefreshing = false;

  private http = inject(HttpClient)
  private router = inject(Router)

  login(credentials: any){
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(response => {
        const token = response.token;
        this.setToken(token);
      })
    );
  }

  set isRefreshing(value){
    this._isRefreshing = value;
  }
  get isRefreshing(){
    return this._isRefreshing;
  }

  setToken(token: string) {localStorage.setItem(this.tokenKey, token);}

  getToken(): string | null {return localStorage.getItem(this.tokenKey);}

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user.Rol;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }

  refresToken(){
    return this.http.get<any>(`${this.apiUrl}/refresh`, { withCredentials: true});
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

}
