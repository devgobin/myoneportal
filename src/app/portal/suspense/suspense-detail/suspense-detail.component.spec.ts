import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseDetailComponent } from './suspense-detail.component';

describe('SuspenseDetailComponent', () => {
  let component: SuspenseDetailComponent;
  let fixture: ComponentFixture<SuspenseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
