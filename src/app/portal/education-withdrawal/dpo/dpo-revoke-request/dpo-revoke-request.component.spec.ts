import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpoRevokeRequestComponent } from './dpo-revoke-request.component';

describe('DpoRevokeRequestComponent', () => {
  let component: DpoRevokeRequestComponent;
  let fixture: ComponentFixture<DpoRevokeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpoRevokeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpoRevokeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
