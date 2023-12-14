import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackingOrderService} from './service/tracking-order.service';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeTransactionComponent } from './component/admin/employee-transaction/employee-transaction.component';
import { EmployeeStorageComponent } from './component/admin/employee-storage/employee-storage.component';
import { ManagerTransactionComponent } from './component/admin/manager-transaction/manager-transaction.component';
import { ManagerStorageComponent } from './component/admin/manager-storage/manager-storage.component';
import { DirectorComponent } from './component/admin/director/director.component';
import { TrackingOrderComponent } from './component/tracking-order/tracking-order.component';
import { LoginComponent } from './component/admin/login/login.component';
import { RegisterComponent } from './component/admin/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/admin/director/dashboard/dashboard.component';
import { StorageOfficeComponent } from './component/admin/director/storage-office/storage-office.component';
import { TransactionOfficeComponent } from './component/admin/director/transaction-office/transaction-office.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracking', pathMatch: 'full' },
  { path: 'tracking', component: TrackingOrderComponent },
  { path: 'director/dashboard', component: DashboardComponent },
  { path: 'manager-storage', component: ManagerStorageComponent },
  { path: 'manager-transaction', component: ManagerTransactionComponent },
  { path: 'tracking/:id', component: TrackingOrderComponent },
  { path: 'employee-transaction', component: EmployeeTransactionComponent },
  { path: 'employee-storage', component: EmployeeStorageComponent },
  { path: 'manager-transaction', component: ManagerTransactionComponent },
  { path: 'manager-storage', component: ManagerStorageComponent },
  { path: 'director', component: DirectorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TrackingOrderComponent,
    EmployeeTransactionComponent,
    EmployeeStorageComponent,
    ManagerTransactionComponent,
    ManagerStorageComponent,
    DirectorComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    StorageOfficeComponent,
    TransactionOfficeComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TrackingOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
