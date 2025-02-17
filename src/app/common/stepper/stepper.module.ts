import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StepperComponent } from "./stepper.component";
import { CdkStepperModule } from "@angular/cdk/stepper";

@NgModule({
  declarations: [StepperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, CdkStepperModule, MatButtonModule, MatMenuModule],
  exports: [StepperComponent, CdkStepperModule],
})
export class StepperModule {}
