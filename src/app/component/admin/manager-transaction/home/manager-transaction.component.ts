import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionId } from 'src/app/entity/transaction-id';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { DirectorService } from 'src/app/service/director/director.service';
import { ManagerService } from 'src/app/service/manager/manager.service';

@Component({
  selector: 'app-manager-transaction',
  templateUrl: './manager-transaction.component.html',
  styleUrls: ['./manager-transaction.component.css']
})
export class ManagerTransactionComponent implements OnInit {
  tmp = '';
  transaction!: TransactionOffices;
  username: string | null = '';
  transaction_id!: TransactionId;
  selectedEmployee!: any;
  constructor(private directorService: DirectorService, 
    private managerService: ManagerService, 
    private router: Router) { 
    this.username = this.managerService.getUserName();
  }

  ngOnInit(): void {
    this.time();

    this.managerService.getTransactionIdByUsername(this.managerService.getUserName()).subscribe(
      data => {
        console.log(data);
        this.transaction_id = data;
        console.log(this.transaction_id.officeId);

        // Get all orders of a storage
        this.managerService.getTransactionByTransactionId(this.transaction_id.officeId).subscribe(
          data => {
            console.log(data);
            this.transaction = data;
            console.log(this.transaction);
            this.transaction.employees.forEach(employee => {
              
                console.log(employee.role[0].id);
              
            });
          }
        )
      }
    )
  }

  displayForm(emplpoyee: any) {
    this.selectedEmployee = emplpoyee;
    console.log(this.selectedEmployee);
    sessionStorage.setItem('selectedEmployee', JSON.stringify(this.selectedEmployee));
    this.router.navigate(['/manager-transaction/update-employee']);
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
