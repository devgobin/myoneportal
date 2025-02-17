import { TestBed } from '@angular/core/testing';

import { MicrofinanceAssistanceService } from './microfinance-assistance.service';

describe('MicrofinanceAssistanceService', () => {
  let service: MicrofinanceAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrofinanceAssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
