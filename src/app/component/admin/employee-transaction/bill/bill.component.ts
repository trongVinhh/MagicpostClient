import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent implements OnInit{
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
    console.log(this.order);
  }
  
}
