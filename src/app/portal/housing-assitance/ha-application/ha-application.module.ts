import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HaApplicationComponent } from "./ha-application.component";
import { Routes, RouterModule } from "@angular/router";
import { FormInputModule } from "src/app/common/form-input/form-input.module";
import { ShareModule } from "src/app/common/share/share.module";
import { AddressComponent } from './address/address.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { PostalAddressComponent } from './postal-address/postal-address.component';
import { ResidentialAddressComponent } from './residential-address/residential-address.component';

const routes: Routes = [
  {
    path: "",
    component: HaApplicationComponent,
  },
];

@NgModule({
  declarations: [HaApplicationComponent, AddressComponent, ApplicantDetailComponent, PostalAddressComponent, ResidentialAddressComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
  ],
})
export class HaApplicationModule {}
