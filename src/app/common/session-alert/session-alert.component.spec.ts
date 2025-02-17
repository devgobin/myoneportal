import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAlertComponent } from './session-alert.component';

describe('SessionAlertComponent', () => {
  let component: SessionAlertComponent;
  let fixture: ComponentFixture<SessionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
