import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContributionScheduleComponent } from './edit-contribution-schedule.component';

describe('EditContributionScheduleComponent', () => {
  let component: EditContributionScheduleComponent;
  let fixture: ComponentFixture<EditContributionScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContributionScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContributionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
