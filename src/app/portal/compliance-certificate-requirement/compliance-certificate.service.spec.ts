import { TestBed } from '@angular/core/testing';

import { ComplianceCertificateService } from './compliance-certificate.service';

describe('ComplianceCertificateService', () => {
  let service: ComplianceCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
