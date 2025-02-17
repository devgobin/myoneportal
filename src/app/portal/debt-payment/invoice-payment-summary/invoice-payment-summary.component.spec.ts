import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentSummaryComponent } from './invoice-payment-summary.component';

describe('InvoicePaymentSummaryComponent', () => {
  let component: InvoicePaymentSummaryComponent;
  let fixture: ComponentFixture<InvoicePaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePaymentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
