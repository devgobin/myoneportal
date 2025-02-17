import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplianceCertificateComponent } from './view-compliance-certificate.component';

describe('ViewComplianceCertificateComponent', () => {
  let component: ViewComplianceCertificateComponent;
  let fixture: ComponentFixture<ViewComplianceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComplianceCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComplianceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
