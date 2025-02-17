import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerStatementComponent } from './employer-statement.component';

describe('EmployerStatementComponent', () => {
  let component: EmployerStatementComponent;
  let fixture: ComponentFixture<EmployerStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
