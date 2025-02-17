import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRefundsSearchComponent } from './student-refunds-search.component';

describe('StudentRefundsSearchComponent', () => {
  let component: StudentRefundsSearchComponent;
  let fixture: ComponentFixture<StudentRefundsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRefundsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRefundsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
