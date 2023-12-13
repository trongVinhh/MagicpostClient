import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient) { }
  
  login(usernameOrEmail: string, password: string) {
    const credentials = { usernameOrEmail, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
