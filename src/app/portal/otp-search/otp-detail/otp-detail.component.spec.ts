import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpDetailComponent } from './otp-detail.component';

describe('OtpDetailComponent', () => {
  let component: OtpDetailComponent;
  let fixture: ComponentFixture<OtpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
