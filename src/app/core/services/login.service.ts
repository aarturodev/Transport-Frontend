import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = 'http://localhost:3000/login';
  private tokenKey = 'access-token';
  private refreshTokenKey = 'refresh-token';

  private http = inject(HttpClient)
  private router = inject(Router)

  login(credenciales: any): Observable<any>{
    return this.http.post<any>(this.Url,credenciales ).pipe(
      tap((res) => {
        if(res.token){
          this.setToken(this.tokenKey, res.token);
          this.setToken(this.refreshTokenKey, res.refreshToken);
        }
      }),
    )
  }

  private setToken(token: string, key: string): void{
    localStorage.setItem(token, key);
  }

  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null{
    const token = this.getToken();
    if(!token){
      return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user.Rol;
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
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }


}
