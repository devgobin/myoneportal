import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteCsSubmissionComponent } from './incomplete-cs-submission.component';

describe('IncompleteCsSubmissionComponent', () => {
  let component: IncompleteCsSubmissionComponent;
  let fixture: ComponentFixture<IncompleteCsSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteCsSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteCsSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
