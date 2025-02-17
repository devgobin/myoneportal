import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationContactComponent } from './organization-contact.component';

describe('OrganizationContactComponent', () => {
  let component: OrganizationContactComponent;
  let fixture: ComponentFixture<OrganizationContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
