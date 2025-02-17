import { TestBed } from '@angular/core/testing';

import { CsAdjustmentService } from './cs-adjustment.service';

describe('CsAdjustmentService', () => {
  let service: CsAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
