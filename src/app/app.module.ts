
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackingOrderService} from './service/track-order/tracking-order.service';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeTransactionComponent } from './component/admin/employee-transaction/new-order/employee-transaction.component';
import { ManagerTransactionComponent } from './component/admin/manager-transaction/employee-management/manager-transaction.component';
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
import { ReceiveOrderComponent } from './component/admin/employee-transaction/receive-order/receive-order.component';
import { StorageDeliveryFormComponent } from './component/admin/employee-storage/storage-delivery-form/storage-delivery-form.component';
import { StorageReceivedOrderComponent } from './component/admin/employee-storage/storage-received-order/storage-received-order.component';
import { SendingOrderComponent } from './component/admin/employee-transaction/sending-order/sending-order.component';
import { ShippingOrderComponent } from './component/admin/employee-transaction/shipping-order/shipping-order.component';
import { DeliveryFormComponent } from './component/admin/employee-transaction/delivery-form/delivery-form.component';
import { StorageSentOrderComponent } from './component/admin/employee-storage/storage-sent-order/storage-sent-order.component';
import { CurrentOrderComponent } from './component/admin/employee-transaction/current-order/current-order.component';
import { ManagerStorageComponent } from './component/admin/manager-storage/employee-management/manager-storage.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracking', pathMatch: 'full' },
  
  { path: 'tracking', component: TrackingOrderComponent },

  { path: 'home', component: TrackingOrderComponent },

  { path: 'tracking/:id', component: TrackingOrderComponent },
  
  // Router for employee-transaction
  { 
    path: 'employee-transaction/deliveryForm', 
    component: DeliveryFormComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },

  { 
    path: 'employee-transaction/createOrder', 
    component: EmployeeTransactionComponent ,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },

  { 
    path: 'employee-transaction/currentOrder', 
    component: CurrentOrderComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },

  { 
    path: 'employee-transaction/receiveOrder', 
    component: ReceiveOrderComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },

  { 
    path: 'employee-transaction/sendOrder', 
    component: SendingOrderComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },

  { 
    path: 'employee-transaction/shippingOrder',
    component: ShippingOrderComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_TRANSACTION'] }
  },
  
  // Router for employee-storage
  { path: 'employee-storage/storageDeliveryForm', 
    component: StorageDeliveryFormComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_STORAGE'] }
  },

  { path: 'employee-storage/storageReceivedOrder', 
    component: StorageReceivedOrderComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_STORAGE'] }
  },

  { path: 'employee-storage/storageSentOrder', 
    component: StorageSentOrderComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: ['ROLE_EMPLOYEE_STORAGE'] }
  },

  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'service', component: ServiceComponent},
  { path: 'contact', component: ContactComponent}, 

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
  { path: '**', redirectTo: 'tracking', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TrackingOrderComponent,
    EmployeeTransactionComponent,
    ManagerTransactionComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    StorageOfficeComponent,
    TransactionOfficeComponent,
    AboutUsComponent,
    ServiceComponent,
    ContactComponent,
    EmployeeManagementComponent,
    ReceiveOrderComponent,
    StorageDeliveryFormComponent,
    DeliveryFormComponent,
    SendingOrderComponent,
    ShippingOrderComponent,
    CurrentOrderComponent,
    StorageReceivedOrderComponent,
    StorageSentOrderComponent,
    ManagerStorageComponent
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
