import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseSearchComponent } from './suspense-search.component';

describe('SuspenseSearchComponent', () => {
  let component: SuspenseSearchComponent;
  let fixture: ComponentFixture<SuspenseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
