import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextLimiterDirective } from "./text-limiter.directive";

@NgModule({
  declarations: [TextLimiterDirective],
  imports: [CommonModule],
  exports: [TextLimiterDirective],
})
export class TextLimiterModule {}
