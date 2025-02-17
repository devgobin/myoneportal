import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOccupationCodeComponent } from './search-occupation-code.component';

describe('SearchOccupationCodeComponent', () => {
  let component: SearchOccupationCodeComponent;
  let fixture: ComponentFixture<SearchOccupationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOccupationCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOccupationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
