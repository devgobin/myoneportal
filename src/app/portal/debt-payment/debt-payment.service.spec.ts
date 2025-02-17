import { TestBed } from '@angular/core/testing';

import { DebtPaymentService } from './debt-payment.service';

describe('DebtPaymentService', () => {
  let service: DebtPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
