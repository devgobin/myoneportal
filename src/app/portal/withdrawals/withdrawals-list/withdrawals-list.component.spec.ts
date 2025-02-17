import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsListComponent } from './withdrawals-list.component';

describe('WithdrawalsListComponent', () => {
  let component: WithdrawalsListComponent;
  let fixture: ComponentFixture<WithdrawalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
