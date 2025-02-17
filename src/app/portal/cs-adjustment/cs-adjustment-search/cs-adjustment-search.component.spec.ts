import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsAdjustmentSearchComponent } from './cs-adjustment-search.component';

describe('CsAdjustmentSearchComponent', () => {
  let component: CsAdjustmentSearchComponent;
  let fixture: ComponentFixture<CsAdjustmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsAdjustmentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsAdjustmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
