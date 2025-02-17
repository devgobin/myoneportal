import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalphoneControlComponent } from './localphone-control.component';

describe('LocalphoneControlComponent', () => {
  let component: LocalphoneControlComponent;
  let fixture: ComponentFixture<LocalphoneControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalphoneControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalphoneControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
