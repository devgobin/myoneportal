import { TestBed } from '@angular/core/testing';

import { ViewReceivedFeesService } from './view-received-fees.service';

describe('ViewReceivedFeesService', () => {
  let service: ViewReceivedFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewReceivedFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
