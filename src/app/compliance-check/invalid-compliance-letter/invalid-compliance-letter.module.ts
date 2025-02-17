import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormInputModule } from "src/app/common/form-input/form-input.module";
import { ShareModule } from "src/app/common/share/share.module";
import { InvalidComplianceLetterComponent } from "./invalid-compliance-letter.component";

const routes: Routes = [
  {
    path: "",
    component: InvalidComplianceLetterComponent,
  },
];

@NgModule({
  declarations: [InvalidComplianceLetterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
  ],
})
export class InvalidComplianceLetterModule {}
