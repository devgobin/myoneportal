import { TestBed } from '@angular/core/testing';

import { BulkInvoiceService } from './bulk-invoice.service';

describe('BulkInvoiceService', () => {
  let service: BulkInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
