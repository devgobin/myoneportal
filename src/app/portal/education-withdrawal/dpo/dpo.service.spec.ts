import { TestBed } from '@angular/core/testing';

import { DpoService } from './dpo.service';

describe('DpoService', () => {
  let service: DpoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
