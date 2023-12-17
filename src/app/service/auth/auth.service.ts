import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:8080/api/v1/auth/login"

  constructor(private httpClient: HttpClient) { }

  login(credentials: {usernameOrEmail: string; password: string}): Observable<any> {
    return this.httpClient.post(this.baseUrl, credentials);
  }

  // public isAuthenticated(): boolean {
  //   const token = sessionStorage.getItem('token');
  //   return (!this.jwtHelper.isTokenExpired(token));
  // }

  
}
