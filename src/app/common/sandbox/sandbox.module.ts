import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "./sandbox.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [SandboxComponent],
  entryComponents: [SandboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [SandboxComponent],
})
export class SandboxModule {}
