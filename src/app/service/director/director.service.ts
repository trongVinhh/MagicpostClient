import { LoginComponent } from '../../component/admin/login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageOffices } from '../../entity/storage-offices';
import { AuthService } from '../auth/auth.service';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { Order } from 'src/app/entity/order';
import { Transaction } from 'src/app/entity/transaction';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private baseUrl = "http://localhost:8080/api/v1/director"
  username: string | null = '';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getUserName() {
    if (sessionStorage.getItem('role') == 'ROLE_ADMIN') {
        this.username = sessionStorage.getItem('username');
    }
    return this.username;
  }      
  
  // Use accessToken to make a request
  token = sessionStorage.getItem('token');
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

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/orders`, {headers: this.headers});
  }

  getAllTransactionsOfTransaction(transactionOfficeId: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/transactionOffice/${transactionOfficeId}/transactions`, {headers: this.headers});
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}/transactions`, {headers: this.headers});
  }

}
