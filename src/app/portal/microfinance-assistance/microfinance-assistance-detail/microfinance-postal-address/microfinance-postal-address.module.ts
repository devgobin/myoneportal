import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicrofinancePostalAddressComponent } from './microfinance-postal-address.component';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';



@NgModule({
  declarations: [MicrofinancePostalAddressComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ShareModule,
    FormInputModule
  ],
  exports: [
    MicrofinancePostalAddressComponent
  ]
})
export class MicrofinancePostalAddressModule { }
