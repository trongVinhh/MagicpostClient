import { ManagerService } from './../../../../service/manager/manager.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entity/order';
import { StorageId } from 'src/app/entity/storage-id';
import { DirectorService } from 'src/app/service/director/director.service';

@Component({
  selector: 'app-statistical-storage',
  templateUrl: './statistical-storage.component.html',
  styleUrls: ['./statistical-storage.component.css']
})

export class StatisticalStorageComponent implements OnInit {
    tmp = '';
    allOrders: Order[] = [];
    username: string | null = '';
    storage_id!: StorageId;
    constructor(private directorService: DirectorService, private managerService: ManagerService) { 
      this.username = this.managerService.getUserName();
    }
  
    ngOnInit(): void {
      this.time();

      this.managerService.getStorageIdByUsername(this.managerService.getUserName()).subscribe(
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
