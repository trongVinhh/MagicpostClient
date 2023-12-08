import { Component, OnInit } from '@angular/core';
import { TrackingInfo } from 'src/app/entity/tracking-info';
import { TrackingOrderService } from 'src/app/service/tracking-order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.css'],
})
export class TrackingOrderComponent implements OnInit {

  trackingInfo!: TrackingInfo;
  trackingCode: string = "";

  constructor(private trackingOrderService: TrackingOrderService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trackingOrderInfo("OD1");
  }


  trackingOrderInfo(orderCode: string) {
    this.trackingOrderService.getTrackingInfo(orderCode).subscribe(data => {
      this.trackingInfo = data;
    }
    )
  };

  submitForm() {
    
  }
  

}
