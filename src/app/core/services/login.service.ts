import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = 'http://localhost:3000/login';
  private tokenKey = 'access-token';

  private http = inject(HttpClient)
  private router = inject(Router)

  login(credenciales: any): Observable<any>{
    return this.http.post<any>(this.Url,credenciales ).pipe(
      tap((res) => {
        if(res.token){
          this.setToken(res.token);
        }
      }),
    )
  }

  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isAutenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000 // convert to milliseconds

    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }


}
