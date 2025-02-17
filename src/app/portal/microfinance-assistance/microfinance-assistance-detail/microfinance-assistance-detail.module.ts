import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicrofinanceAssistanceDetailComponent } from './microfinance-assistance-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { MicrofinanceAssistanceAddressModule } from './microfinance-assistance-address/microfinance-assistance-address.module';
import { MicrofinancePostalAddressModule } from './microfinance-postal-address/microfinance-postal-address.module';
import { MicrofinanceResidentialAddressModule } from './microfinance-residential-address/microfinance-residential-address.module';

const routes: Routes = [
  {
    path: '',
    component: MicrofinanceAssistanceDetailComponent
  }
];

@NgModule({
  declarations: [MicrofinanceAssistanceDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
    MicrofinanceResidentialAddressModule,
    MicrofinancePostalAddressModule,
    MicrofinanceAssistanceAddressModule
  ]
})
export class MicrofinanceAssistanceDetailModule { }
