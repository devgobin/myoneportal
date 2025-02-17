import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicrofinanceResidentialAddressComponent } from './microfinance-residential-address.component';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';



@NgModule({
  declarations: [MicrofinanceResidentialAddressComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ShareModule,
    FormInputModule
  ],
  exports: [
    MicrofinanceResidentialAddressComponent
  ]
})
export class MicrofinanceResidentialAddressModule { }
