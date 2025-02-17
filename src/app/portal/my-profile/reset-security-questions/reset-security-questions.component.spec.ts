import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSecurityQuestionsComponent } from './reset-security-questions.component';

describe('ResetSecurityQuestionsComponent', () => {
  let component: ResetSecurityQuestionsComponent;
  let fixture: ComponentFixture<ResetSecurityQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetSecurityQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetSecurityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
