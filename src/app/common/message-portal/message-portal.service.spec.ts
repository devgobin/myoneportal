import { TestBed } from '@angular/core/testing';

import { MessagePortalService } from './message-portal.service';

describe('MessagePortalService', () => {
  let service: MessagePortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagePortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
