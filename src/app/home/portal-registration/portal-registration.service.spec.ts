import { TestBed } from '@angular/core/testing';

import { PortalRegistrationService } from './portal-registration.service';

describe('PortalRegistrationService', () => {
  let service: PortalRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
