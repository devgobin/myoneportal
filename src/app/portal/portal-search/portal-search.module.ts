import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalSearchComponent } from './portal-search.component';



@NgModule({
  declarations: [PortalSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
  ],
  exports: [
    PortalSearchComponent
  ]
})
export class PortalSearchModule { }
