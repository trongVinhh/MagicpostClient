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
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ServiceComponent } from './component/service/service.component';
import { ContactComponent } from './component/contact/contact.component';
import { StatisticalStorageComponent } from './component/admin/manager-storage/statistical-storage/statistical-storage.component';
import { StatisticalTransactionComponent } from './component/admin/manager-transaction/statistical-transaction/statistical-transaction.component';
import { EmployeeManagementComponent } from './component/admin/director/employee-management/employee-management.component';
import { AddemployeeComponent } from './component/admin/manager-storage/addemployee/addemployee.component';
import { CreateEmployeeComponent } from './component/admin/director/create-employee/create-employee.component';
import { InsertEmployeeComponent } from './component/admin/manager-transaction/insert-employee/insert-employee.component';
import { UpdateEmployeeComponent } from './component/admin/manager-storage/update-employee/update-employee.component';
import { UpdateEmplComponent } from './component/admin/manager-transaction/update-empl/update-empl.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracking', pathMatch: 'full' },
  
  { path: 'tracking', component: TrackingOrderComponent },
  { path: 'home', component: TrackingOrderComponent },
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
  {path: 'manager-storage/update-employee', component: UpdateEmployeeComponent},
  { path: 'employee-storage/home', component: EmployeeStorageComponent },
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'service', component: ServiceComponent},
  { path: 'contact', component: ContactComponent},  
  { 
    path: 'manager-transaction/home', 
    component: ManagerTransactionComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_MANAGER_TRANSACTION'] }
  },
  {path: 'manager-transaction/create-employee', component: InsertEmployeeComponent},
  {path: 'manager-transaction/update-employee', component: UpdateEmplComponent},
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
    path: 'manager-storage', 
    component: ManagerStorageComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_MANAGER_STORAGE'] }
  },
  { 
    path: 'manager-storage/create-employee', 
    component: AddemployeeComponent,
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
  { path: '**', redirectTo: 'tracking', pathMatch: 'full' },
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
    AboutUsComponent,
    ServiceComponent,
    ContactComponent,
    EmployeeManagementComponent,
    StatisticalStorageComponent,
    StatisticalTransactionComponent,
    ManagerTransactionComponent,
    EmployeeStatisticalComponent,
    EmployeeTransactionComponent,
    AddemployeeComponent,
    CreateEmployeeComponent,
    InsertEmployeeComponent,
    UpdateEmployeeComponent,
    UpdateEmplComponent
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
