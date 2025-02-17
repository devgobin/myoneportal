import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryContactDetailComponent } from './primary-contact-detail.component';

describe('PrimaryContactDetailComponent', () => {
  let component: PrimaryContactDetailComponent;
  let fixture: ComponentFixture<PrimaryContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryContactDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
