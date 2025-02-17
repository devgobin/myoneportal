import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDpoComponent } from './view-dpo.component';

describe('ViewDpoComponent', () => {
  let component: ViewDpoComponent;
  let fixture: ComponentFixture<ViewDpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
