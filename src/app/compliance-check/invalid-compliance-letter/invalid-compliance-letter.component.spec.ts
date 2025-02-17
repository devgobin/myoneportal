import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidComplianceLetterComponent } from './invalid-compliance-letter.component';

describe('InvalidComplianceLetterComponent', () => {
  let component: InvalidComplianceLetterComponent;
  let fixture: ComponentFixture<InvalidComplianceLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidComplianceLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidComplianceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
