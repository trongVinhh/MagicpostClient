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

const routes: Routes = [
  { path: '', component: TrackingOrderComponent },
  { path: '/tracking?orderCode=:id', component: TrackingOrderComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TrackingOrderComponent,
    EmployeeTransactionComponent,
    EmployeeStorageComponent,
    ManagerTransactionComponent,
    ManagerStorageComponent,
    DirectorComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [TrackingOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
