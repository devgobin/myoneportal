import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCsFileComponent } from './generate-cs-file.component';

describe('GenerateCsFileComponent', () => {
  let component: GenerateCsFileComponent;
  let fixture: ComponentFixture<GenerateCsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCsFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
