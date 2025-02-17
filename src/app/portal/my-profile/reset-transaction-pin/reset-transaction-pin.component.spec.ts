import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTransactionPinComponent } from './reset-transaction-pin.component';

describe('ResetTransactionPinComponent', () => {
  let component: ResetTransactionPinComponent;
  let fixture: ComponentFixture<ResetTransactionPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetTransactionPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTransactionPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
