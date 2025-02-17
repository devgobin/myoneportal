import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployerRegistrationComponent } from "./employer-registration.component";
import { RouterModule, Routes } from "@angular/router";
import { FormInputModule } from "src/app/common/form-input/form-input.module";
import { ShareModule } from "src/app/common/share/share.module";
import { AddressDetailComponent } from "./address-detail/address-detail.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { DirectorDetailComponent } from "./director-detail/director-detail.component";
import { PrimaryContactDetailComponent } from "./primary-contact-detail/primary-contact-detail.component";
import { CsContactDetailComponent } from "./cs-contact-detail/cs-contact-detail.component";
import { ViewPdfModule } from "src/app/common/view-pdf/view-pdf.module";

const routes: Routes = [
  {
    path: "",
    component: EmployerRegistrationComponent,
  },
];

@NgModule({
  declarations: [
    EmployerRegistrationComponent,
    AddressDetailComponent,
    ContactDetailComponent,
    DirectorDetailComponent,
    PrimaryContactDetailComponent,
    CsContactDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
    ViewPdfModule,
  ],
})
export class EmployerRegistrationModule {}
