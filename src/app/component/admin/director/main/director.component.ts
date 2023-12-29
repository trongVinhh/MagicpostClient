import { StorageOffices } from 'src/app/entity/storage-offices';
import { DirectorService } from '../../../../service/director/director.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit, AfterViewInit {
  tmp = '';
  username: string | null = '';
  storage_offices: StorageOffices[] = [];
  transaction_offices: TransactionOffices[] = [];
  error: string = '';
  customerCount: number = 0;
  countOffice : number = 0;
  countStorageOffice: number = 0;
  countTransactionOffice: number = 0;
  dataPoints:any = [];
  chart:any;
  constructor(private directorService: DirectorService, private http: HttpClient) {
    this.username = this.directorService.getUserName();
    this.getCountCustomer();
    this.getCountStorageOfficeAndTransactionOffice();
  }
  ngAfterViewInit(): void {
    this.http.get('https://canvasjs.com/data/gallery/angular/btcusd2021.json', { responseType: 'json' }).subscribe((response: any) => {
      let data = response;
      for(let i = 0; i < data.length; i++){
        this.dataPoints.push({x: new Date(data[i].date), y: Number(data[i].close) });
      }
      this.chart.subtitles[0].remove();
    });
  }

  ngOnInit(): void {
      this.time();
  }

  getCountCustomer() {
    this.directorService.getCustomers().subscribe(
      data => {
        if (data != null) {
          this.customerCount = data.length;
          sessionStorage.setItem('countCustomer', data.toString());
        }
      }
    )
  }

  getCountStorageOfficeAndTransactionOffice() {
      this.directorService.getAllStorageOffices().subscribe(data => {
        if (data != null) {
          this.storage_offices = data;
          this.countOffice += data.length;
          this.countStorageOffice += data.length;
          sessionStorage.setItem('countStorageOffice', this.storage_offices.length.toString());
          
        }
      });
      
      this.directorService.getAllTransactionOffices().subscribe(data => {
        if (data != null) {
          this.transaction_offices = data;
          console.log(this.transaction_offices);
          this.countOffice += data.length;
          this.countTransactionOffice += data.length;
          sessionStorage.setItem('countTransactionOffice', this.storage_offices.length.toString());
        }
      });

      console.log(this.countOffice);
  }

  chartOptions = {
    theme: "light2",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text:"Thống kê giao dịch"
    },
    subtitles: [{
      text: "Loading Data...",
      fontSize: 24,
      horizontalAlign: "center",
      verticalAlign: "center",
      dockInsidePlotArea: true
    }],
    axisY: {
      title: "",
      prefix: ""
    },
    data: [{
      type: "line",
      name: "Closing Price",
      yValueFormatString: "$#,###.00",
      xValueType: "dateTime",
      dataPoints: this.dataPoints
    }]
  }
 
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  chartOptionss = { 
	  title: {
		  text: "Số lượng đơn hàng"
	  },
	  theme: "light2",
	  animationEnabled: true,
	  exportEnabled: true,
	  axisY: {
		includeZero: true,
		valueFormatString: "$#,##0k"
	  },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		yValueFormatString: "$#,##0k",
		color: "#01b8aa",
		dataPoints: [
			{ label: "Jan", y: 172 },
			{ label: "Feb", y: 189 },
			{ label: "Mar", y: 201 },
			{ label: "Apr", y: 240 },
			{ label: "May", y: 166 },
			{ label: "Jun", y: 196 },
			{ label: "Jul", y: 218 },
			{ label: "Aug", y: 167 },
			{ label: "Sep", y: 175 },
			{ label: "Oct", y: 152 },
			{ label: "Nov", y: 156 },
			{ label: "Dec", y: 164 }
		]
	  }]
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
