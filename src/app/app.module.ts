import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackingOrderService} from './service/track-order/tracking-order.service';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeTransactionComponent } from './component/admin/employee-transaction/employee-transaction.component';
import { EmployeeStorageComponent } from './component/admin/employee-storage/employee-storage.component';
import { ManagerTransactionComponent } from './component/admin/manager-transaction/manager-transaction.component';
import { ManagerStorageComponent } from './component/admin/manager-storage/manager-storage.component';
import { DirectorComponent } from './component/admin/director/director.component';
import { TrackingOrderComponent } from './component/tracking-order/tracking-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/admin/login/login.component';
import { RegisterComponent } from './component/admin/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tracking', component: TrackingOrderComponent },
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
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TrackingOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
