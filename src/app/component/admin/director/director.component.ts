import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  isClickDashboard: boolean = true;
  isClickTransactionOffices: boolean = false;
  isClickWareHouses: boolean = false;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  handleClick(name: string) {
    if (name == 'dashboard') {
      this.isClickDashboard = true;
      this.isClickTransactionOffices = false;
      this.isClickWareHouses = false;
    } else if (name == 'transaction-offices') {
      this.isClickDashboard = false;
      this.isClickTransactionOffices = true;
      this.isClickWareHouses = false;
    } else if (name == 'ware-houses') {
      this.isClickDashboard = false;
      this.isClickTransactionOffices = false;
      this.isClickWareHouses = true;
    }
  }
  getAllEmployee() {}
  getAllTransactionOffices() {}
  getAllWareHouses() {}

}
