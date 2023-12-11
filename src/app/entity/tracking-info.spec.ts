import { TrackingInfo } from './tracking-info';

describe('TrackingInfo', () => {
  it('should create an instance', () => {
    const trackingInfo = new TrackingInfo(
      '12345',
      100,
      2.5,
      '123 Main St',
      'John Doe',
      '555-1234',
      'Warehouse A',
      new Date()
    );
    expect(trackingInfo).toBeTruthy();
  });
});
