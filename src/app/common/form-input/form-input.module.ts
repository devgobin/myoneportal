import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputControlComponent } from "./input-control/input-control.component";
import { PasswordControlComponent } from "./password-control/password-control.component";
import { ShareModule } from "../share/share.module";
import { SelectControlComponent } from "./select-control/select-control.component";
import { DateFormatModule } from "./date-control/date-format.module";
import { NumberControlComponent } from "./number-control/number-control.component";
import { LowerCaseModule } from "../lower-case/lower-case.module";
import { EmailControlComponent } from "./email-control/email-control.component";
import { TextareaControlComponent } from "./textarea-control/textarea-control.component";
import { PinControlComponent } from "./pin-control/pin-control.component";
import { NumberOnlyModule } from "../number-only/number-only.module";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { SpinnerModule } from "../spinner/spinner.module";
import { PhoneControlComponent } from "./phone-control/phone-control.component";
import { TextLimiterModule } from "../text-limiter/text-limiter.module";
import { LimitDirective } from "./limit/limit.directive";
import { LocalphoneControlComponent } from "./localphone-control/localphone-control.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ImageCropDialogComponent } from "./file-upload/image-crop-dialog/image-crop-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ValueControlComponent } from "./value-control/value-control.component";
import { TotalControlComponent } from "./total-control/total-control.component";

@NgModule({
  declarations: [
    InputControlComponent,
    PasswordControlComponent,
    SelectControlComponent,
    NumberControlComponent,
    EmailControlComponent,
    TextareaControlComponent,
    PinControlComponent,
    FileUploadComponent,
    PhoneControlComponent,
    LimitDirective,
    LocalphoneControlComponent,
    ImageCropDialogComponent,
    ValueControlComponent,
    TotalControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    DateFormatModule,
    LowerCaseModule,
    NumberOnlyModule,
    NgbPopoverModule,
    MatPasswordStrengthModule,
    SpinnerModule,
    TextLimiterModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  exports: [
    FormsModule,
    DateFormatModule,
    InputControlComponent,
    PasswordControlComponent,
    SelectControlComponent,
    NumberControlComponent,
    EmailControlComponent,
    TextareaControlComponent,
    PinControlComponent,
    FileUploadComponent,
    PhoneControlComponent,
    LimitDirective,
    LocalphoneControlComponent,
    ValueControlComponent,
    TotalControlComponent,
  ],
  entryComponents: [],
})
export class FormInputModule {}
