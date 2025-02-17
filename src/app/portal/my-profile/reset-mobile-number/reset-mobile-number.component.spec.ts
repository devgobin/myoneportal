import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMobileNumberComponent } from './reset-mobile-number.component';

describe('ResetMobileNumberComponent', () => {
  let component: ResetMobileNumberComponent;
  let fixture: ComponentFixture<ResetMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetMobileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
