import { Component, OnInit } from '@angular/core';
import { TrackingInfo } from 'src/app/entity/tracking-info';
import { TrackingOrderService } from 'src/app/service/tracking-order.service';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.css']
})
export class TrackingOrderComponent implements OnInit {

  trackingInfo: TrackingInfo = new TrackingInfo("", 0, 0, "", "", "", "", new Date());

  constructor(private trackingOrderService: TrackingOrderService) { }

  ngOnInit(): void {
    this.trackingOrderInfo("OD1");
  }

  trackingOrderInfo(orderCode: string) {
    this.trackingOrderService.getTrackingInfo(orderCode).subscribe(data => {
      this.trackingInfo = data;
      console.log(this.trackingInfo)
    }
    )
  };

}
