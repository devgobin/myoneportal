import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationContactDetailComponent } from './organization-contact-detail.component';

describe('OrganizationContactDetailComponent', () => {
  let component: OrganizationContactDetailComponent;
  let fixture: ComponentFixture<OrganizationContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationContactDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
