import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSelectOrganizationComponent } from './login-select-organization.component';

describe('LoginSelectOrganizationComponent', () => {
  let component: LoginSelectOrganizationComponent;
  let fixture: ComponentFixture<LoginSelectOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSelectOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSelectOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
