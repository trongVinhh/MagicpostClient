import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private baseUrl = "http://localhost:8080/api/v1/manager";
  username: string | null = '';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getUserName() {
    if (sessionStorage.getItem('role') == "ROLE_MANAGER_STORAGE") {
      this.username = sessionStorage.getItem('username');
    }
    return this.username;
  }

  
}
