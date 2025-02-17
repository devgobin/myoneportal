import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SingleImageViewerComponent } from "./single-image-viewer.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MainPipeModule } from "src/app/pipe/main-pipe.module";

@NgModule({
  declarations: [SingleImageViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MainPipeModule],
  exports: [SingleImageViewerComponent],
})
export class SingleImageViewerModule {}
