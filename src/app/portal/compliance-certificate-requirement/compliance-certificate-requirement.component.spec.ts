import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceCertificateRequirementComponent } from './compliance-certificate-requirement.component';

describe('ComplianceCertificateRequirementComponent', () => {
  let component: ComplianceCertificateRequirementComponent;
  let fixture: ComponentFixture<ComplianceCertificateRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceCertificateRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceCertificateRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
