import { TestBed } from '@angular/core/testing';

import { TimePaymentPlanService } from './time-payment-plan.service';

describe('TimePaymentPlanService', () => {
  let service: TimePaymentPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimePaymentPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
