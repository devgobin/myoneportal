import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidComplianceLetterComponent } from './valid-compliance-letter.component';

describe('ValidComplianceLetterComponent', () => {
  let component: ValidComplianceLetterComponent;
  let fixture: ComponentFixture<ValidComplianceLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidComplianceLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidComplianceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
