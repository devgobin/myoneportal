import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DebtPaymentSearchComponent } from "./debt-payment-search.component";
import { RouterModule, Routes } from "@angular/router";
import { FormInputModule } from "src/app/common/form-input/form-input.module";
import { ShareModule } from "src/app/common/share/share.module";

const routes: Routes = [
  {
    path: "",
    component: DebtPaymentSearchComponent,
  },
];

@NgModule({
  declarations: [DebtPaymentSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
  ],
})
export class DebtPaymentSearchModule {}
