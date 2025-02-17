import { TestBed } from '@angular/core/testing';

import { StudentRefundsService } from './student-refunds.service';

describe('StudentRefundsService', () => {
  let service: StudentRefundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRefundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
