import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsContactDetailComponent } from './cs-contact-detail.component';

describe('CsContactDetailComponent', () => {
  let component: CsContactDetailComponent;
  let fixture: ComponentFixture<CsContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsContactDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
