import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInvoiceUploadComponent } from './bulk-invoice-upload.component';

describe('BulkInvoiceUploadComponent', () => {
  let component: BulkInvoiceUploadComponent;
  let fixture: ComponentFixture<BulkInvoiceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkInvoiceUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkInvoiceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
