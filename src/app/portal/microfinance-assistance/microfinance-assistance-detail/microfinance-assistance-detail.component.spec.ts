import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceAssistanceDetailComponent } from './microfinance-assistance-detail.component';

describe('MicrofinanceAssistanceDetailComponent', () => {
  let component: MicrofinanceAssistanceDetailComponent;
  let fixture: ComponentFixture<MicrofinanceAssistanceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofinanceAssistanceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceAssistanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
