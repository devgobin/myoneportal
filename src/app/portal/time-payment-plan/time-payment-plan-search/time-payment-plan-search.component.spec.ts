import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePaymentPlanSearchComponent } from './time-payment-plan-search.component';

describe('TimePaymentPlanSearchComponent', () => {
  let component: TimePaymentPlanSearchComponent;
  let fixture: ComponentFixture<TimePaymentPlanSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePaymentPlanSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePaymentPlanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
