import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedMessageDetailComponent } from './recieved-message-detail.component';

describe('RecievedMessageDetailComponent', () => {
  let component: RecievedMessageDetailComponent;
  let fixture: ComponentFixture<RecievedMessageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievedMessageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedMessageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
