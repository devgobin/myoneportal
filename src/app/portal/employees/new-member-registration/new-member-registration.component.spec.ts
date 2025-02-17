import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberRegistrationComponent } from './new-member-registration.component';

describe('NewMemberRegistrationComponent', () => {
  let component: NewMemberRegistrationComponent;
  let fixture: ComponentFixture<NewMemberRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMemberRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
