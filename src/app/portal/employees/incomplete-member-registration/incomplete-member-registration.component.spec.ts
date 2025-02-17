import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteMemberRegistrationComponent } from './incomplete-member-registration.component';

describe('IncompleteMemberRegistrationComponent', () => {
  let component: IncompleteMemberRegistrationComponent;
  let fixture: ComponentFixture<IncompleteMemberRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteMemberRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteMemberRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
