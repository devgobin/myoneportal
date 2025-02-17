import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterButtonComponent } from "./filter-button.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [FilterButtonComponent],
  imports: [CommonModule, OverlayModule, MatButtonModule],
  exports: [FilterButtonComponent],
})
export class FilterButtonModule {}
