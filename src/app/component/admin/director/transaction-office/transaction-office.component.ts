import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/entity/transaction';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { DirectorService } from 'src/app/service/director/director.service';

@Component({
  selector: 'app-transaction-office',
  templateUrl: './transaction-office.component.html',
  styleUrls: ['../main/director.component.css']
})
export class TransactionOfficeComponent implements OnInit {
  tmp = '';
  transaction_offices: TransactionOffices[] = [];
  allTransactions: Transaction[] = [];

  constructor(private directorService: DirectorService) { }

  ngOnInit() {
    this.directorService.getAllTransactionOffices().subscribe(
      (data) => {
        console.log(data);
        this.transaction_offices = data;
      }
    )

    this.directorService.getAllTransactions().subscribe(
      (data) => {
        console.log(data);
        this.allTransactions = data;
      }
    )

    this.time()
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
