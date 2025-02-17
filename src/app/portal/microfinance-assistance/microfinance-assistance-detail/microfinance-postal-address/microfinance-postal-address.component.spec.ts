import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinancePostalAddressComponent } from './microfinance-postal-address.component';

describe('MicrofinancePostalAddressComponent', () => {
  let component: MicrofinancePostalAddressComponent;
  let fixture: ComponentFixture<MicrofinancePostalAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofinancePostalAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinancePostalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
