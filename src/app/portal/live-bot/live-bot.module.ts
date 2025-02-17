import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LiveBotComponent } from "./live-bot.component";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MainPipeModule } from "src/app/pipe/main-pipe.module";

@NgModule({
  declarations: [LiveBotComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MainPipeModule,
    DragDropModule,
  ],
  exports: [LiveBotComponent],
})
export class LiveBotModule {}
