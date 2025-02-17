import { TestBed } from '@angular/core/testing';

import { NewWithdrawalsService } from './new-withdrawals.service';

describe('NewWithdrawalsService', () => {
  let service: NewWithdrawalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewWithdrawalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
