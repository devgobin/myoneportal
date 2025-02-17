import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmittedContributionComponent } from './view-submitted-contribution.component';

describe('ViewSubmittedContributionComponent', () => {
  let component: ViewSubmittedContributionComponent;
  let fixture: ComponentFixture<ViewSubmittedContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubmittedContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubmittedContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
