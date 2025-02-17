import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceivedFeesComponent } from './view-received-fees.component';

describe('ViewReceivedFeesComponent', () => {
  let component: ViewReceivedFeesComponent;
  let fixture: ComponentFixture<ViewReceivedFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReceivedFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceivedFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
