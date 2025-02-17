import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceResidentialAddressComponent } from './microfinance-residential-address.component';

describe('MicrofinanceResidentialAddressComponent', () => {
  let component: MicrofinanceResidentialAddressComponent;
  let fixture: ComponentFixture<MicrofinanceResidentialAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofinanceResidentialAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceResidentialAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
