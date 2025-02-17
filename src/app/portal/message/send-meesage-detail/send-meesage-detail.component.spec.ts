import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMeesageDetailComponent } from './send-meesage-detail.component';

describe('SendMeesageDetailComponent', () => {
  let component: SendMeesageDetailComponent;
  let fixture: ComponentFixture<SendMeesageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMeesageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMeesageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
