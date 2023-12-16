import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/entity/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = "http://localhost:8080/api/v1/customer"

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  // Token not completed
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  getCustomerDetail(customerId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/${customerId}`);
  }

  getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.baseUrl);
  }
}
