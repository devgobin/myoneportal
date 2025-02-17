import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInvoiceSearchComponent } from './bulk-invoice-search.component';

describe('BulkInvoiceSearchComponent', () => {
  let component: BulkInvoiceSearchComponent;
  let fixture: ComponentFixture<BulkInvoiceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkInvoiceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkInvoiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
