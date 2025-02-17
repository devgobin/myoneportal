import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsAdjustmentDetailComponent } from './cs-adjustment-detail.component';

describe('CsAdjustmentDetailComponent', () => {
  let component: CsAdjustmentDetailComponent;
  let fixture: ComponentFixture<CsAdjustmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsAdjustmentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsAdjustmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
