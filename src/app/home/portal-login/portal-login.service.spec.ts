import { TestBed } from '@angular/core/testing';

import { PortalLoginService } from './portal-login.service';

describe('PortalLoginService', () => {
  let service: PortalLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
