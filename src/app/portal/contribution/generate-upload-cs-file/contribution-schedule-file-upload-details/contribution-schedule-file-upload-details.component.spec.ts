import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionScheduleFileUploadDetailsComponent } from './contribution-schedule-file-upload-details.component';

describe('ContributionScheduleFileUploadDetailsComponent', () => {
  let component: ContributionScheduleFileUploadDetailsComponent;
  let fixture: ComponentFixture<ContributionScheduleFileUploadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionScheduleFileUploadDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionScheduleFileUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
