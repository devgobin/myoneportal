import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWithdrawalComponent } from './new-withdrawal.component';

describe('NewWithdrawalComponent', () => {
  let component: NewWithdrawalComponent;
  let fixture: ComponentFixture<NewWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
