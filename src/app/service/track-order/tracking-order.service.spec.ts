import { TestBed } from '@angular/core/testing';

import { TrackingOrderService } from './tracking-order.service';

describe('TrackingOrderService', () => {
  let service: TrackingOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
