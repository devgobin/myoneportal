import { TestBed } from '@angular/core/testing';

import { HousingAssistanceService } from './housing-assitance.service';

describe('HousingAssitanceService', () => {
  let service: HousingAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingAssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
