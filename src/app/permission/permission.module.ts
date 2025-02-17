import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAccessDirective } from './menu-access.directive';
import { AppAccessDirective } from './app-access.directive';



@NgModule({
  declarations: [
    MenuAccessDirective,
    AppAccessDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuAccessDirective,
    AppAccessDirective
  ]
})
export class PermissionModule { }
