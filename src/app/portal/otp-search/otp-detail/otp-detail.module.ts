import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OtpDetailComponent } from "./otp-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { ShareModule } from "src/app/common/share/share.module";
import { FormInputModule } from "src/app/common/form-input/form-input.module";

const routes: Routes = [
  {
    path: "",
    component: OtpDetailComponent,
  },
];

@NgModule({
  declarations: [OtpDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
  ],
})
export class OtpDetailModule {}
