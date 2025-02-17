import { TestBed } from '@angular/core/testing';

import { GenerateUploadCsFileService } from './generate-upload-cs-file.service';

describe('GenerateUploadCsFileService', () => {
  let service: GenerateUploadCsFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateUploadCsFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
