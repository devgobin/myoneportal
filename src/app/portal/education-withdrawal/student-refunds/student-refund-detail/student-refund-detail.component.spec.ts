import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRefundDetailComponent } from './student-refund-detail.component';

describe('StudentRefundDetailComponent', () => {
  let component: StudentRefundDetailComponent;
  let fixture: ComponentFixture<StudentRefundDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRefundDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRefundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
