import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/entity/order';
import { StorageId } from 'src/app/entity/storage-id';
import { StorageOffices } from 'src/app/entity/storage-offices';
import { DirectorService } from 'src/app/service/director/director.service';
import { ManagerService } from 'src/app/service/manager/manager.service';
@Component({
  selector: 'app-manager-storage',
  templateUrl: './manager-storage.component.html',
  styleUrls: ['./manager-storage.component.css']
})
export class ManagerStorageComponent implements OnInit {

  tmp = '';
  storage!: StorageOffices;
  username: string | null = '';
  storage_id!: StorageId;
  id!: string;
  employees!: any;
  selectedEmployee!: any;
  constructor(private directorService: DirectorService, private managerService: ManagerService,
    private router: Router) {
    this.username = this.managerService.getUserName();
    this.getStorageIdByUsername();
    // this.getStorageByStorageId();
  }

  //test in dữ liệu oke
  printTable() {
    let tab = document.getElementById('sampleTable') as HTMLTableElement;
    let win = window.open('', '', 'height=700,width=700');
    if (win) {
      win.document.write(tab.outerHTML);
      win.document.close();
      win.print();
    }
  }

  ngOnInit(): void {
    this.time();
  }

  displayForm(emplpoyee: any) {
    this.selectedEmployee = emplpoyee;
    sessionStorage.setItem('selectedEmployee', JSON.stringify(this.selectedEmployee));
    this.router.navigate(['/manager-storage/update-employee']);
  }
  getStorageIdByUsername() {
    this.managerService.getStorageIdByUsername(this.managerService.getUserName()).subscribe(
      data => {
        console.log(data);
        this.id = data.officeId;
        // this.storage_id = data;
        // console.log(this.storage_id.officeId);
        // Get all orders of a storage
        this.managerService.getStorageByStorageId(this.id).subscribe(
          data => {
            console.log(data);
            this.storage = data;
            console.log(this.storage);
            this.employees = this.storage.employees;
            console.log(this.employees);
          }
        )
      }
    )
  }

  getStorageByStorageId() {
    // Get all orders of a storage
    this.managerService.getStorageByStorageId(this.id).subscribe(
      data => {
        console.log(data);
        this.storage = data;
        console.log(this.storage);
        this.employees = this.storage.employees;
        console.log(this.employees);
      }
    )
  }

  getEmployeeByStorageId() {
    this.managerService.getStorageByStorageId(this.storage_id.officeId).subscribe(
      data => {
        console.log(data);
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
    var mm: string | number = today.getMonth() + 1;
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
