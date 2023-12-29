import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent implements OnInit{
  qrCodeData: string = ''; // Chuỗi JSON của đối tượng
  qrCodeUrl: string = ''; // URL c
printBill() {
  // hide div
  document.getElementById('box')!.style.display = 'none';
  window.print();
  // check xem in xong thi hien lai div
  document.getElementById('box')!.style.display = 'block';
}
  customer: any;
  order: any;
  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem('newCustomer')!);
    this.order = JSON.parse(sessionStorage.getItem('newOrder')!);
    // console.log(this.customer);

    this.qrCodeData = JSON.stringify(this.order);

    QRCode.toDataURL(this.qrCodeData, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      this.qrCodeUrl = url;
    });
    console.log(this.order);
  }
  
}
