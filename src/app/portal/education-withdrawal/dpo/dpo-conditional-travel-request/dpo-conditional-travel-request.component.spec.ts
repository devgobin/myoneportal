import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpoConditionalTravelRequestComponent } from './dpo-conditional-travel-request.component';

describe('DpoConditionalTravelRequestComponent', () => {
  let component: DpoConditionalTravelRequestComponent;
  let fixture: ComponentFixture<DpoConditionalTravelRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpoConditionalTravelRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpoConditionalTravelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
