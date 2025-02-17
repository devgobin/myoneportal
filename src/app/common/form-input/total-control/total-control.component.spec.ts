import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalControlComponent } from './total-control.component';

describe('TotalControlComponent', () => {
  let component: TotalControlComponent;
  let fixture: ComponentFixture<TotalControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
