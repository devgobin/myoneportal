import { CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateCsFileComponent } from './generate-cs-file.component';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';

const routes: Routes = [
  {
    path: '',
    component: GenerateCsFileComponent
  }
];

@NgModule({
  declarations: [GenerateCsFileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class GenerateCsFileModule {
 
}
