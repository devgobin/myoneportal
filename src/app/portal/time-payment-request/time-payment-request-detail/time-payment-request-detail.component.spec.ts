import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePaymentRequestDetailComponent } from './time-payment-request-detail.component';

describe('TimePaymentRequestDetailComponent', () => {
  let component: TimePaymentRequestDetailComponent;
  let fixture: ComponentFixture<TimePaymentRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePaymentRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePaymentRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
