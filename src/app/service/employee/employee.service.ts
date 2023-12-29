import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StorageId } from 'src/app/entity/storage-id';
import { StorageOffices } from 'src/app/entity/storage-offices';
import { Observable } from 'rxjs';
import { TransactionId } from 'src/app/entity/transaction-id';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { Customer } from 'src/app/entity/customer';
import { Transaction } from 'src/app/entity/transaction';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = "http://localhost:8080/api/v1/employee";
  private customerUrl = "http://localhost:8080/api/v1/customer";
  private baseUrlEmployee = "http://localhost:8080/api/v1/employee";
  //API tỉnh thành phố 
  private baseUrlCity = "https://thongtindoanhnghiep.co/api/city";
  username: string | null = '';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  token = sessionStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  getUserName() {
    if (sessionStorage.getItem('role') == "ROLE_EMPLOYEE_TRANSACTION" || sessionStorage.getItem('role') == "ROLE_EMPLOYEE_STORAGE") {
      this.username = sessionStorage.getItem('username');
    }
    return this.username;
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.customerUrl}`, customer, { headers: this.headers })
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`http://localhost:8080/api/v1/transaction/create`, transaction, { headers: this.headers})
  }

  getCustomerByPhone(phone: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.customerUrl}/phone?phone=${phone}`, { headers: this.headers });
  }
  
  createEmployee(employee: any, role: number): Observable<any> {
    console.log(`${this.baseUrlEmployee}/role/${role}`)
    return this.httpClient.post<any>(`${this.baseUrlEmployee}/role/${role}`, employee, { headers: this.headers });
  }

  updateEmployee(employee: any, role: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlEmployee}/${employee.id}/role/${role}/update`, employee, { headers: this.headers });
  }

  deleteEmployee(id: string) : Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrlEmployee}/${id}`, { headers: this.headers });
  }

  // getStorageIdByUsername(username: string | null): Observable<StorageId> {
  //   return this.httpClient.get<StorageId>(`${this.baseUrl}/getStorageIdByUsername?username=${username}`, {headers: this.headers});
  // }

  // getStorageByStorageId(storageId: string | null): Observable<StorageOffices> {
  //   return this.httpClient.get<StorageOffices>(`${this.baseUrl}/getStorage?id=${storageId}`, {headers: this.headers});
  // }

  // getTransactionIdByUsername(username: string | null): Observable<TransactionId> {
  //   return this.httpClient.get<TransactionId>(`${this.baseUrl}/getTransactionOfficeIdByUsername?username=${username}`, {headers: this.headers});
  // }

  // getTransactionByTransactionId(transactionId: string | null): Observable<TransactionOffices> {
  //   return this.httpClient.get<TransactionOffices>(`${this.baseUrl}/getTransaction?id=${transactionId}`, {headers: this.headers});
  // }

  // regex số điện thoại: ([+84|0][3|5|7|8|9])+([0-9]{8})\b
}
