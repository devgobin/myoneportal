import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaApplicationComponent } from './ha-application.component';

describe('HaApplicationComponent', () => {
  let component: HaApplicationComponent;
  let fixture: ComponentFixture<HaApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
