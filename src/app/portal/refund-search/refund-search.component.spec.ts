import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSearchComponent } from './refund-search.component';

describe('RefundSearchComponent', () => {
  let component: RefundSearchComponent;
  let fixture: ComponentFixture<RefundSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
