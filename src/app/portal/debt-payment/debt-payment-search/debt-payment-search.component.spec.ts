import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtPaymentSearchComponent } from './debt-payment-search.component';

describe('DebtPaymentSearchComponent', () => {
  let component: DebtPaymentSearchComponent;
  let fixture: ComponentFixture<DebtPaymentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtPaymentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtPaymentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
