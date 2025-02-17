import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBotComponent } from './live-bot.component';

describe('LiveBotComponent', () => {
  let component: LiveBotComponent;
  let fixture: ComponentFixture<LiveBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
