import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDpoRequestComponent } from './view-dpo-request.component';

describe('ViewDpoRequestComponent', () => {
  let component: ViewDpoRequestComponent;
  let fixture: ComponentFixture<ViewDpoRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDpoRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDpoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
