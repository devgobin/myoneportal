import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePaymentPlanScheduleNewComponent } from './time-payment-plan-schedule-new.component';

describe('TimePaymentPlanScheduleNewComponent', () => {
  let component: TimePaymentPlanScheduleNewComponent;
  let fixture: ComponentFixture<TimePaymentPlanScheduleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePaymentPlanScheduleNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePaymentPlanScheduleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
