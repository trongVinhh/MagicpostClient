import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, 
    private employeeService: EmployeeService, private customerService: CustomerService,
    private router: Router) { 
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
    this.newCustomer.firstName = "";
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

    // console.log(this.newOrder)
    this.createNewOrder(this.newCustomer, this.newOrder);
    sessionStorage.setItem('newOrder', JSON.stringify(this.newOrder));
    sessionStorage.setItem('newCustomer', JSON.stringify(this.newCustomer));
    this.router.navigate(['/employee-transaction/bill']);
  }


  createNewOrder(customer: Customer, order: Transaction) {
    order.customerDto = customer;
    this.employeeService.createTransaction(order).subscribe(response => {
      console.log('Transaction created', response);
      alert("Đã tạo đơn hàng thành công");
    });
  }
  

  //Api tỉnh thành 
  private baseUrl = "https://provinces.open-api.vn/api/";
  regionList = ["Miền Bắc", "Miền Trung", "Miền Nam"];
  senderRegionCode: number = 0;
  receiverRegionCode: number = 0;

  provinceList: Province[] = [];
  filteredSenderProvinceList: Province[] = [];
  filteredReceiverProvinceList: Province[] = [];
  senderProvinceCode: number = 0;
  receiverProvinceCode: number = 0;

  districtList: District[] = [];
  filteredSenderDistrictList: District[] = [];
  filteredReceiverDistrictList: District[] = [];
  senderDistrictCode: number = 0;
  receiverDistrictCode: number = 0;

  wardList: Ward[] = [];
  filteredSenderWardList: Ward[] = [];
  filteredReceiverWardList: Ward[] = [];
  senderWardCode: number = 0;
  receiverWardCode: number = 0;
  separateRegion = [[1, 37], [38, 68], [70, 96]];
  limitProvince: number[] = [];


  //Lấy region code và lọc tỉnh thành theo region code
  getSenderProvinceList() {
    if (this.senderRegionCode == 1) {
      this.limitProvince = this.separateRegion[0];
    } else if (this.senderRegionCode == 2) {
      this.limitProvince = this.separateRegion[1];
    } else {
      this.limitProvince = this.separateRegion[2];
    }

    this.filteredSenderProvinceList = this.provinceList.filter((province: Province) => {
      return province.code >= this.limitProvince[0] && province.code <= this.limitProvince[1];
    });
    console.log(this.filteredSenderProvinceList);
  }

  getReceiverProvinceList() {
    if (this.receiverRegionCode == 1) {
      this.limitProvince = this.separateRegion[0];
    } else if (this.receiverRegionCode == 2) {
      this.limitProvince = this.separateRegion[1];
    } else {
      this.limitProvince = this.separateRegion[2];
    }

    this.filteredReceiverProvinceList = this.provinceList.filter((province: Province) => {
      return province.code >= this.limitProvince[0] && province.code <= this.limitProvince[1];
    });
    console.log(this.filteredReceiverProvinceList);
  }
  
  
  getSenderProvinceCode(provinceName: string): number {
    for (let province of this.filteredSenderProvinceList) {
      if (province.name == provinceName) {
        return province.code;
      }
    }
    return 0;
  }
  
  getReceiverProvinceCode(provinceName: string): number {
    for (let province of this.filteredReceiverProvinceList) {
      if (province.name == provinceName) {
        return province.code;
      }
    }
    return 0;
  }

  getSenderDistrictList() {
    this.filteredSenderDistrictList = this.districtList.filter((district: District) => {
      return district.province_code == this.getSenderProvinceCode(this.orderForm.get('senderProvince')?.value);
    });

    console.log(this.filteredSenderDistrictList);
  }

  getReceiverDistrictList() {
    this.filteredReceiverDistrictList = this.districtList.filter((district: District) => {
      return district.province_code == this.getReceiverProvinceCode(this.orderForm.get('receiverProvince')?.value);
    });

    console.log(this.filteredReceiverDistrictList);
  }
  
  getSenderDistrictCode(districtName: string): number {
    for (let district of this.filteredSenderDistrictList) {
      if (district.name == districtName) {
        return district.code;
      }
    }
    return 0;
  }

  getReceiverDistrictCode(districtName: string): number {
    for (let district of this.filteredReceiverDistrictList) {
      if (district.name == districtName) {
        return district.code;
      }
    }
    return 0;
  }

  getSenderWardList() {
    this.filteredSenderWardList = this.wardList.filter((ward: Ward) => {
      return ward.district_code == this.getSenderDistrictCode(this.orderForm.get('senderDistrict')?.value);
    });

    console.log(this.filteredSenderWardList);
  }

  getReceiverWardList() {
    this.filteredReceiverWardList = this.wardList.filter((ward: Ward) => {
      return ward.district_code == this.getReceiverDistrictCode(this.orderForm.get('receiverDistrict')?.value);
    });

    console.log(this.filteredReceiverWardList);
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
