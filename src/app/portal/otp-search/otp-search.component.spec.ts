import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSearchComponent } from './otp-search.component';

describe('OtpSearchComponent', () => {
  let component: OtpSearchComponent;
  let fixture: ComponentFixture<OtpSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
