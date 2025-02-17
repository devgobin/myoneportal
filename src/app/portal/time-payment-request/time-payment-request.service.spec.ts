import { TestBed } from '@angular/core/testing';

import { TimePaymentRequestService } from './time-payment-request.service';

describe('TimePaymentRequestService', () => {
  let service: TimePaymentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimePaymentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
