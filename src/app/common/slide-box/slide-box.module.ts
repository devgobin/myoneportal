import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideBoxComponent } from './slide-box.component';
import { CdkStepperModule } from '@angular/cdk/stepper';



@NgModule({
  declarations: [SlideBoxComponent],
  imports: [
    CommonModule,
    CdkStepperModule
  ],
  exports: [
    SlideBoxComponent,
    CdkStepperModule
  ]
})
export class SlideBoxModule { }
