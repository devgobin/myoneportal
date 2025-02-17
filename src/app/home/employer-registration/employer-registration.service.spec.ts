import { TestBed } from '@angular/core/testing';

import { EmployerRegistrationService } from './employer-registration.service';

describe('EmployerRegistrationService', () => {
  let service: EmployerRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
