import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePaymentRequestSearchComponent } from './time-payment-request-search.component';

describe('TimePaymentRequestSearchComponent', () => {
  let component: TimePaymentRequestSearchComponent;
  let fixture: ComponentFixture<TimePaymentRequestSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePaymentRequestSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePaymentRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
