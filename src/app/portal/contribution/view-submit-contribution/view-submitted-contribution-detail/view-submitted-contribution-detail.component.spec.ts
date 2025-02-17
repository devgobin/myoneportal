import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmittedContributionDetailComponent } from './view-submitted-contribution-detail.component';

describe('ViewSubmittedContributionDetailComponent', () => {
  let component: ViewSubmittedContributionDetailComponent;
  let fixture: ComponentFixture<ViewSubmittedContributionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubmittedContributionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubmittedContributionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
