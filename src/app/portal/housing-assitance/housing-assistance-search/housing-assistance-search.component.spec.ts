import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingAssistanceSearchComponent } from './housing-assistance-search.component';

describe('HousingAssistanceSearchComponent', () => {
  let component: HousingAssistanceSearchComponent;
  let fixture: ComponentFixture<HousingAssistanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingAssistanceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingAssistanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
