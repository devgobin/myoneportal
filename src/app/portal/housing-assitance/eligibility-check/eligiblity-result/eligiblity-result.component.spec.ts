import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligiblityResultComponent } from './eligiblity-result.component';

describe('EligiblityResultComponent', () => {
  let component: EligiblityResultComponent;
  let fixture: ComponentFixture<EligiblityResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligiblityResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EligiblityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
