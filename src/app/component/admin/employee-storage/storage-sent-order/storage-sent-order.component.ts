import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entity/order';
import { StorageId } from 'src/app/entity/storage-id';
import { Transaction } from 'src/app/entity/transaction';
import { TransactionId } from 'src/app/entity/transaction-id';
import { DirectorService } from 'src/app/service/director/director.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ManagerService } from 'src/app/service/manager/manager.service';

@Component({
  selector: 'app-storage-sent-order',
  templateUrl: './storage-sent-order.component.html',
  styleUrls: ['./storage-sent-order.component.css']
})
export class StorageSentOrderComponent implements OnInit {

  tmp = '';
  isConfirmed: boolean = false;
    allOrders: Order[] = [];
    username: string | null = '';
    storage_id!: StorageId;
    constructor(private directorService: DirectorService, private managerService: ManagerService, private employeeService: EmployeeService) { 
      this.username = this.employeeService.getUserName();
    }
  
    ngOnInit(): void {
      this.time();

      this.managerService.getStorageIdByUsername(this.employeeService.getUserName()).subscribe(
        data => {
          console.log(data);
          this.storage_id = data;
          console.log(this.storage_id.officeId);

          // Get all orders of a storage
          this.directorService.getAllOrdersOfStorage(this.storage_id.officeId).subscribe(
            data => {
              console.log(data);
              this.allOrders = data;
            }
          )
        }
      )
    }

    

    time() {
      var today = new Date();
      var weekday = new Array(7);
      weekday[0] = "Chủ Nhật";
      weekday[1] = "Thứ Hai";
      weekday[2] = "Thứ Ba";
      weekday[3] = "Thứ Tư";
      weekday[4] = "Thứ Năm";
      weekday[5] = "Thứ Sáu";
      weekday[6] = "Thứ Bảy";
      var day = weekday[today.getDay()];
      var dd: string | number = today.getDate();
      var mm:string | number = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var h = today.getHours();
      var m = this.checkTime(today.getMinutes());
      var s = this.checkTime(today.getSeconds());
      var nowTime = h + " giờ " + m + " phút " + s + " giây";
      if (dd < 10) {
        dd = '0' + dd.toString();
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      this.tmp = day + ', ' + dd + '/' + mm + '/' + yyyy + ' - ' + nowTime;
      setTimeout(() => this.time(), 1000);
    }
  
    checkTime(i: number): string {
      if (i < 10) {
        return "0" + i;
      }
      return i.toString();
    }

}
