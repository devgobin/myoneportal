import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceAssistanceSearchComponent } from './microfinance-assistance-search.component';

describe('MicrofinanceAssistanceSearchComponent', () => {
  let component: MicrofinanceAssistanceSearchComponent;
  let fixture: ComponentFixture<MicrofinanceAssistanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofinanceAssistanceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceAssistanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
