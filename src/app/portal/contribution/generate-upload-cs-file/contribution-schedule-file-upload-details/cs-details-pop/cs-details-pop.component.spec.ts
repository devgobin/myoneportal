import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsDetailsPopComponent } from './cs-details-pop.component';

describe('CsDetailsPopComponent', () => {
  let component: CsDetailsPopComponent;
  let fixture: ComponentFixture<CsDetailsPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsDetailsPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsDetailsPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
