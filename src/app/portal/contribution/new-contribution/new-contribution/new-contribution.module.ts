import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewContributionComponent } from './new-contribution.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { EditEmployeeDetailComponent } from './edit-employee-detail/edit-employee-detail.component';
import { SearchOccupationCodeComponent } from './edit-employee-detail/search-occupation-code/search-occupation-code.component';

const routes: Routes = [
  {
    path: '',
    component: NewContributionComponent
  }
];

@NgModule({
  declarations: [NewContributionComponent, EditEmployeeDetailComponent, SearchOccupationCodeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class NewContributionModule { }
