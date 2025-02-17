import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionScheduleFileUploadComponent } from './contribution-schedule-file-upload.component';

describe('ContributionScheduleFileUploadComponent', () => {
  let component: ContributionScheduleFileUploadComponent;
  let fixture: ComponentFixture<ContributionScheduleFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionScheduleFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionScheduleFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
