import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePaymentPlanScheduleComponent } from './time-payment-plan-schedule.component';

describe('TimePaymentPlanScheduleComponent', () => {
  let component: TimePaymentPlanScheduleComponent;
  let fixture: ComponentFixture<TimePaymentPlanScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePaymentPlanScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePaymentPlanScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
