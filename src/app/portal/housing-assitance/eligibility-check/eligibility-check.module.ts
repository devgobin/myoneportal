import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EligibilityCheckComponent } from "./eligibility-check.component";
import { Routes, RouterModule } from "@angular/router";
import { FormInputModule } from "src/app/common/form-input/form-input.module";
import { ShareModule } from "src/app/common/share/share.module";
import { EligiblityResultComponent } from './eligiblity-result/eligiblity-result.component';

const routes: Routes = [
  {
    path: "",
    component: EligibilityCheckComponent,
  },
  {
    path: "EligiblityResult",
    component: EligiblityResultComponent,
  },
];

@NgModule({
  declarations: [EligibilityCheckComponent, EligiblityResultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
  ],
})
export class EligibilityCheckModule { }
