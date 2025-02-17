import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsAdjustmentDetailNewComponent } from './cs-adjustment-detail-new.component';

describe('CsAdjustmentDetailNewComponent', () => {
  let component: CsAdjustmentDetailNewComponent;
  let fixture: ComponentFixture<CsAdjustmentDetailNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsAdjustmentDetailNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsAdjustmentDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
