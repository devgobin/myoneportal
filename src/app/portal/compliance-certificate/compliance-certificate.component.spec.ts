import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceCertificateComponent } from './compliance-certificate.component';

describe('ComplianceCertificateComponent', () => {
  let component: ComplianceCertificateComponent;
  let fixture: ComponentFixture<ComplianceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
