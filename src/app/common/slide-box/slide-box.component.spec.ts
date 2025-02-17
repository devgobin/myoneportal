import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBoxComponent } from './slide-box.component';

describe('SlideBoxComponent', () => {
  let component: SlideBoxComponent;
  let fixture: ComponentFixture<SlideBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
