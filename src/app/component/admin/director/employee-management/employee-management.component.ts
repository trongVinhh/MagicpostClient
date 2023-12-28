import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import District from 'src/app/entity/district';
import { Employee } from 'src/app/entity/employee';
import Province from 'src/app/entity/province';
import Ward from 'src/app/entity/ward';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
  
})
export class EmployeeManagementComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});
  newEmployee!: Employee;
  createdCustomer!: Employee;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private employeeService: EmployeeService, private customerService: CustomerService) { 
    this.newEmployee = {} as Employee;
  }

  ngOnInit(): void {
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllWard();
    
    this.employeeForm = this.formBuilder.group({
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
    this.newEmployee.firstName = "Trần";
    this.newEmployee.lastName = this.employeeForm.get('senderName')?.value;
    this.newEmployee.phone = this.employeeForm.get('senderPhone')?.value;
    this.newEmployee.address = this.employeeForm.get('senderWard')?.value + " - " + this.employeeForm.get('senderDistrict')?.value + " - " + this.employeeForm.get('senderProvince')?.value;
    this.newEmployee.email = this.employeeForm.get('senderEmail')?.value;
    console.log(this.employeeForm.get('senderEmail')?.value);

    // this.createNewEmployee(this.newEmployee);

  }


  // createNewEmployee(employee: Employee) {
  //   this.employeeService.createTransaction(order).subscribe(response => {
  //     console.log('Transaction created', response);
  //   });
  // }

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
      return district.province_code == this.getProvinceCode(this.employeeForm.get('senderProvince')?.value);
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
      return ward.district_code == this.getDistrictCode(this.employeeForm.get('senderDistrict')?.value);
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
