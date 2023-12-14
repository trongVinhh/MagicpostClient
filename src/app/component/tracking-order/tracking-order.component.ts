import { Component, OnInit } from '@angular/core';
import { TrackingInfo } from 'src/app/entity/tracking-info';
import { TrackingOrderService } from 'src/app/service/track-order/tracking-order.service';
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
    private formBuilder: FormBuilder) { 
      console.log("1")
  }

  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      orderCode: ['', Validators.required],
    });
  }


  trackingOrderInfo(orderCode: string) {
    this.trackingOrderService.getTrackingInfo(orderCode).subscribe(data => {
        this.trackingInfo = data;
        console.log(this.trackingInfo)
        }
    )
  };

  submitForm() {
    const orderCode = this.myForm.get('orderCode')?.value;
    this.trackingOrderInfo(orderCode);
  }
  

}
