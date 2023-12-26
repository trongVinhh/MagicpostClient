import { EmployeeStatisticalComponent } from './component/admin/employee-transaction/employee-statistical/employee-statistical.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackingOrderService} from './service/track-order/tracking-order.service';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeTransactionComponent } from './component/admin/employee-transaction/home/employee-transaction.component';
import { EmployeeStorageComponent } from './component/admin/employee-storage/employee-storage.component';
import { ManagerTransactionComponent } from './component/admin/manager-transaction/home/manager-transaction.component';
import { ManagerStorageComponent } from './component/admin/manager-storage/home/manager-storage.component';
import { DirectorComponent } from './component/admin/director/main/director.component';
import { TrackingOrderComponent } from './component/tracking-order/tracking-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/admin/login/login.component';
import { RegisterComponent } from './component/admin/register/register.component';
import { TransactionOfficeComponent } from './component/admin/director/transaction-office/transaction-office.component';
import { StorageOfficeComponent } from './component/admin/director/storage-office/storage-office.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { AuthService } from './service/auth/auth.service';
import { StatisticalStorageComponent } from './component/admin/manager-storage/statistical-storage/statistical-storage.component';
import { StatisticalTransactionComponent } from './component/admin/manager-transaction/statistical-transaction/statistical-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tracking', component: TrackingOrderComponent },
  { path: 'tracking/:id', component: TrackingOrderComponent },
  
  { 
    path: 'employee-transaction/home', 
    component: EmployeeTransactionComponent ,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },

  { 
    path: 'employee-transaction/transactions', 
    component: EmployeeStatisticalComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },
  
  { path: 'employee-storage', component: EmployeeStorageComponent },

  { 
    path: 'manager-transaction/home', 
    component: ManagerTransactionComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_MANAGER_TRANSACTION'] }
  },

  { 
    path: 'manager-transaction/transactions', 
    component: StatisticalTransactionComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_MANAGER_TRANSACTION'] }
  },

  { 
    path: 'manager-storage/home', 
    component: ManagerStorageComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_MANAGER_STORAGE'] }
  },

  { 
    path: 'manager-storage/orders', 
    component: StatisticalStorageComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_MANAGER_STORAGE'] }
  },

  { 
    path: 'director/home', 
    component: DirectorComponent , 
    canActivate: [AuthGuardService], 
    data: { expectedRole: ['ROLE_ADMIN'] }
  },

  { 
    path: 'director/storage-offices', 
    component: StorageOfficeComponent, 
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_ADMIN'] }
  },

  { 
    path: 'director/transaction-offices', 
    component: TransactionOfficeComponent, 
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_ADMIN'] }
  },

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
    NavigationComponent,
    StorageOfficeComponent,
    TransactionOfficeComponent,
    StatisticalStorageComponent,
    StatisticalTransactionComponent,
    EmployeeStatisticalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
  ],
  providers: [TrackingOrderService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
