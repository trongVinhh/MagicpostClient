import { Component, OnInit } from '@angular/core';
import { TrackingInfo } from 'src/app/entity/tracking-info';
import { TrackingOrderService } from 'src/app/service/tracking-order.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.css'],
})
export class TrackingOrderComponent implements OnInit {
  trackingForm!: FormGroup;
  trackingInfo!: TrackingInfo;
  trackingCode: string = "";
  trackingCodeValid: boolean = true;
  notFound: boolean = false;
  constructor(private trackingOrderService: TrackingOrderService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trackingForm = this.formBuilder.group({
      trackingCode: ['', [Validators.required, Validators.minLength(1)]]
    });
  }


  async trackingOrderInfo(orderCode: string) {
    this.trackingOrderService.getTrackingInfo(orderCode).subscribe(
      data => {
        this.trackingInfo = data;
        this.notFound = false;
      },
      error => {
        this.notFound = true;
      }
    );
  }
  async submitForm() {
    if (this.trackingForm.valid) {
      const trackingCode = this.trackingForm.get('trackingCode')?.value;
      this.trackingOrderInfo(trackingCode);
      this.trackingCodeValid = true;
    } else {
      this.notFound = false;
      this.trackingCodeValid = false;
    }

  }


}
