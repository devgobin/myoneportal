import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { DotComponent } from './dot/dot.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    DotComponent
  ],
  imports: [
  ],
  exports: [
    SpinnerComponent,
    DotComponent
  ]
})
export class SpinnerModule { }
