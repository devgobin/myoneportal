import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceAssistanceAddressComponent } from './microfinance-assistance-address.component';

describe('MicrofinanceAssistanceAddressComponent', () => {
  let component: MicrofinanceAssistanceAddressComponent;
  let fixture: ComponentFixture<MicrofinanceAssistanceAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofinanceAssistanceAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceAssistanceAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
