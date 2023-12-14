import { LoginComponent } from '../../component/admin/login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageOffices } from '../../entity/storage-offices';
import { AuthService } from '../auth/auth.service';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { Order } from 'src/app/entity/order';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private baseUrl = "http://localhost:8080/api/v1/director"

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  // Use accessToken to make a request
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  // Get all storage offices
  getAllStorageOffices(): Observable<StorageOffices[]> {  
    return this.httpClient.get<StorageOffices[]>(this.baseUrl + "/storage-offices", {headers: this.headers});
  }

  // Get all transaction offices
  getAllTransactionOffices(): Observable<TransactionOffices[]> {
    return this.httpClient.get<TransactionOffices[]>(this.baseUrl + "/transaction-offices", {headers: this.headers});
  }

  getAllOrdersOfStorage(storageOfficeId: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/storage/${storageOfficeId}/orders`, {headers: this.headers});
  }
}
