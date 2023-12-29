import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/entity/customer';
import District from 'src/app/entity/district';
import Province from 'src/app/entity/province';
import { Transaction } from 'src/app/entity/transaction';
import Ward from 'src/app/entity/ward';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-employee-transaction',
  templateUrl: './employee-transaction.component.html',
  styleUrls: ['./employee-transaction.component.css']
})
export class EmployeeTransactionComponent implements OnInit {
  orderForm: FormGroup = new FormGroup({});
  newCustomer!: Customer;
  newOrder!: Transaction;
  createdCustomer!: Customer;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private employeeService: EmployeeService, private customerService: CustomerService) { 
    this.newCustomer = {} as Customer;
    this.newOrder = {} as Transaction;
  }

  ngOnInit(): void {
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllWard();
    
    this.orderForm = this.formBuilder.group({
      senderName: [''],
      senderPhone: [''],
      senderEmail: [''],
      senderRegion: [''],
      senderProvince: [''],
      senderDistrict: [''],
      senderWard: [''],
      receiverName: [''],
      receiverPhone: [''],
      receiverRegion: [''],
      receiverProvince: [''],
      receiverDistrict: [''],
      receiverWard: [''],
      orderCode: [''],
      packageType: [''],
      mass: [''],
      postage: [''],
      extraFee: [''],
      totalPrice:['']
    });
  }

  onSubmit() {
    this.newCustomer.firstName = "Trần";
    this.newCustomer.lastName = this.orderForm.get('senderName')?.value;
    this.newCustomer.phone = this.orderForm.get('senderPhone')?.value;
    this.newCustomer.address = this.orderForm.get('senderWard')?.value + " - " + this.orderForm.get('senderDistrict')?.value + " - " + this.orderForm.get('senderProvince')?.value;
    this.newCustomer.email = this.orderForm.get('senderEmail')?.value;
    console.log(this.orderForm.get('senderEmail')?.value);
    this.newOrder.orderCode = this.orderForm.get('orderCode')?.value;
    this.newOrder.packageType = this.orderForm.get('packageType')?.value;
    this.newOrder.mass = this.orderForm.get('mass')?.value;
    this.newOrder.postage = this.orderForm.get('postage')?.value;
    this.newOrder.totalPrice = this.orderForm.get('totalPrice')?.value;
    this.newOrder.receiveAddress = this.orderForm.get('receiverWard')?.value + " - " + this.orderForm.get('receiverDistrict')?.value + " - " + this.orderForm.get('receiverProvince')?.value;
    this.newOrder.receiverName = this.orderForm.get('receiverName')?.value;
    this.newOrder.phoneNumber = this.orderForm.get('receiverPhone')?.value;
    this.newOrder.employeeId = sessionStorage.getItem('employeeId') || "";
    this.newOrder.transactionOfficeId = "1";

    console.log(this.newOrder)
    this.createNewOrder(this.newCustomer, this.newOrder);

  }


  createNewOrder(customer: Customer, order: Transaction) {
    order.customerDto = customer;
    this.employeeService.createTransaction(order).subscribe(response => {
      console.log('Transaction created', response);
    });
  }
  

  //Api tỉnh thành 
  private baseUrl = "https://provinces.open-api.vn/api/";
  regionList = ["Miền Bắc", "Miền Trung", "Miền Nam"];
  regionCode: number = 0;
  provinceList: Province[] = [];
  filteredProvinceList: Province[] = [];
  provinceCode: number = 0;
  districtList: District[] = [];
  filteredDistrictList: District[] = [];
  districtCode: number = 0;
  wardList: Ward[] = [];
  filteredWardList: Ward[] = [];
  wardCode: number = 0;
  separateRegion = [[1, 37], [38, 68], [70, 96]];
  limitProvince: number[] = [];


  //Lấy region code và lọc tỉnh thành theo region code
  getProvinceList() {
    if (this.regionCode == 1) {
      this.limitProvince = this.separateRegion[0];
    } else if (this.regionCode == 2) {
      this.limitProvince = this.separateRegion[1];
    } else {
      this.limitProvince = this.separateRegion[2];
    }

    this.filteredProvinceList = this.provinceList.filter((province: Province) => {
      return province.code >= this.limitProvince[0] && province.code <= this.limitProvince[1];
    });
    console.log(this.filteredProvinceList);
  }
  
  //
  getProvinceCode(provinceName: string): number {
    for (let province of this.filteredProvinceList) {
      if (province.name == provinceName) {
        return province.code;
      }
    }
    return 0;
  }

  
  getDistrictList() {
    this.filteredDistrictList = this.districtList.filter((district: District) => {
      return district.province_code == this.getProvinceCode(this.orderForm.get('senderProvince')?.value);
    });

    console.log(this.filteredDistrictList);
  }
  
  getDistrictCode(districtName: string): number {
    for (let district of this.filteredDistrictList) {
      if (district.name == districtName) {
        return district.code;
      }
    }
    return 0;
  }

  getWardList() {
    this.filteredWardList = this.wardList.filter((ward: Ward) => {
      return ward.district_code == this.getDistrictCode(this.orderForm.get('senderDistrict')?.value);
    });

    console.log(this.filteredWardList);
  }


  //Lấy tất cả danh sách tỉnh thành, quận huyện, phường xã
  getAllProvince() {
    this.httpClient.get(this.baseUrl + "p").subscribe((data: any) => {
      console.log(data);
      this.provinceList = data;
    })
  }

  getAllDistrict() {
    this.httpClient.get(this.baseUrl + "d").subscribe((data: any) => {
      this.districtList = data;
    })
  }

  getAllWard() {
    this.httpClient.get(this.baseUrl + "w").subscribe((data: any) => {
      this.wardList = data;
    })
  }


}
