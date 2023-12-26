import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import District from 'src/app/entity/district';
import Province from 'src/app/entity/province';
import Ward from 'src/app/entity/ward';

@Component({
  selector: 'app-employee-transaction',
  templateUrl: './employee-transaction.component.html',
  styleUrls: ['./employee-transaction.component.css']
})
export class EmployeeTransactionComponent implements OnInit {
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllWard();
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
  getDistrictList() {
    this.filteredDistrictList = this.districtList.filter((district: District) => {
      return district.province_code == this.provinceCode;
    });

    console.log(this.filteredDistrictList);
  }
  
  getWardList() {
    this.filteredWardList = this.wardList.filter((ward: Ward) => {
      return ward.district_code == this.districtCode;
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
