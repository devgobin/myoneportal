import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewMemberRegistrationComponent } from "./new-member-registration.component";
import { Routes, RouterModule } from "@angular/router";
import { ShareModule } from "src/app/common/share/share.module";
import { FormInputModule } from "src/app/common/form-input/form-input.module";
import { MemberRegistration } from "./new-member-registration.service";
import { NomineeDetailComponent } from "./nominee-detail/nominee-detail.component";
import { FileViewerModule } from "src/app/common/file-viewer/file-viewer.module";

const routes: Routes = [
  {
    path: "",
    component: NewMemberRegistrationComponent,
  },
];

@NgModule({
  declarations: [NewMemberRegistrationComponent, NomineeDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
    FileViewerModule,
  ],
  //providers: [MemberRegistration],
})
export class NewMemberRegistrationModule {}
