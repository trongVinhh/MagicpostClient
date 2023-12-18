import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { StorageId } from 'src/app/entity/storage-id';
import { StorageOffices } from 'src/app/entity/storage-offices';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private baseUrl = "http://localhost:8080/api/v1/manager";
  username: string | null = '';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  token = sessionStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  getUserName() {
    if (sessionStorage.getItem('role') == "ROLE_MANAGER_STORAGE") {
      this.username = sessionStorage.getItem('username');
    }
    return this.username;
  }

  getStorageIdByUsername(username: string | null): Observable<StorageId> {
    return this.httpClient.get<StorageId>(`${this.baseUrl}/getStorageIdByUsername?username=${username}`, {headers: this.headers});
  }

  getStorageByStorageId(storageId: string | null): Observable<StorageOffices> {
    return this.httpClient.get<StorageOffices>(`${this.baseUrl}/getStorage?id=${storageId}`, {headers: this.headers});
  }
}