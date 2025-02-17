import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingContributionComponent } from './outstanding-contribution.component';

describe('OutstandingContributionComponent', () => {
  let component: OutstandingContributionComponent;
  let fixture: ComponentFixture<OutstandingContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
