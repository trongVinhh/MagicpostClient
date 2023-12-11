import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TrackingInfo } from '../entity/tracking-info';

@Injectable({
  providedIn: 'root'
})
export class TrackingOrderService {
  private baseUrl = "http://localhost:8080/api/v1/tracking"

  constructor(private  httpClient:HttpClient) { }

  getTrackingInfo(orderCode:string): Observable<TrackingInfo> {
    
    return this.httpClient.get<TrackingInfo>(this.baseUrl + "?orderCode=" + orderCode);
  }
}
