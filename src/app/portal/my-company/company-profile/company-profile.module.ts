import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { AddressComponent } from './address/address.component';
import { CommunicationComponent } from './communication/communication.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfileComponent
  }
];

@NgModule({
  declarations: [CompanyProfileComponent, AddressComponent, CommunicationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class CompanyProfileModule { }
