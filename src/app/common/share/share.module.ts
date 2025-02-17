import { FilterButtonModule } from "./../filter-button/filter-button.module";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SpinnerModule } from "../spinner/spinner.module";
import { FullSpinnerModule } from "../full-spinner/full-spinner.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatSelectModule } from "@angular/material/select";
import { MainPipeModule } from "src/app/pipe/main-pipe.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteAlertModule } from "../delete-alert/delete-alert.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
// import {MatTooltipModule} from '@angular/material/tooltip';
import { MatRadioModule } from "@angular/material/radio";
import { CommonAlertModule } from "../common-alert/common-alert.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { StepperModule } from "../stepper/stepper.module";
import { TimerComponent } from "../timer/timer.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SlideBoxModule } from "../slide-box/slide-box.module";
import { PortalSearchModule } from "src/app/portal/portal-search/portal-search.module";
import { FormsModule } from "@angular/forms";
import { PermissionModule } from "src/app/permission/permission.module";
import { NoEmojiModule } from "../no-emoji/no-emoji.module";
import { SuccessAlertModule } from "../success-alert/success-alert.module";
import { EmptyStateModule } from "../empty-state/empty-state.module";
import { MatSortModule } from "@angular/material/sort";
import { ViewPdfModule } from "../view-pdf/view-pdf.module";
import { LiveBotModule } from "src/app/portal/live-bot/live-bot.module";
@NgModule({
  declarations: [TimerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    PermissionModule,
    SpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
    FullSpinnerModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MainPipeModule,
    MatTabsModule,
    MatDialogModule,
    DeleteAlertModule,
    CommonAlertModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    StepperModule,
    SlideBoxModule,
    MatBadgeModule,
    PortalSearchModule,
    FormsModule,
    NoEmojiModule,
    SuccessAlertModule,
    EmptyStateModule,
    ViewPdfModule,
    LiveBotModule,
    FilterButtonModule,
  ],
  exports: [
    TimerComponent,
    PermissionModule,
    SpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    OverlayModule,
    PortalModule,
    FullSpinnerModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MainPipeModule,
    MatTabsModule,
    MatDialogModule,
    DeleteAlertModule,
    CommonAlertModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    StepperModule,
    SlideBoxModule,
    MatBadgeModule,
    PortalSearchModule,
    FormsModule,
    NoEmojiModule,
    SuccessAlertModule,
    EmptyStateModule,
    ViewPdfModule,
    LiveBotModule,
    FilterButtonModule,
  ],
})
export class ShareModule {}
