import { TrackingInfo } from './entity/tracking-info';
import { TrackingOrderService } from 'src/app/service/tracking-order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MagicpostClient';
  orderCode: string = '';
  onSubmit() {
    // Call your desired function with the order code
    this.myFunction(this.orderCode);
  }

  myFunction(orderCode: string) {
    // Perform actions with the order code
    console.log('Order code:', orderCode);
  }
  trackingInfo!: TrackingInfo;
  constructor(private trackingService: TrackingOrderService) {}

  trackOrder(): void {
    this.trackingService.getTrackingInfo(this.orderCode).subscribe(
      trackingInfo => {
        this.trackingInfo = trackingInfo;
        console.log(trackingInfo);
      },
      error => {
        console.error(error);
      }
    );
  }
}
