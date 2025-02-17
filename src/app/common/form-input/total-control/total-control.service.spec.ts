import { TestBed } from '@angular/core/testing';

import { TotalControlService } from './total-control.service';

describe('TotalControlService', () => {
  let service: TotalControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
