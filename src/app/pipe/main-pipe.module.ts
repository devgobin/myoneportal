import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { MainFilterPipe } from "./main-filter.pipe";
import { SelectSearchPipe } from "./select-search.pipe";
import { MomentPipe } from "./moment.pipe";
import { SafePipe } from "./safe.pipe";
import { AsurlPipe } from "./asurl.pipe";
import { CsErrorTooltipPipe } from "./cs-error-tooltip.pipe";
import { MessagePortalPipe } from "./message-portal.pipe";
import { AppCurrencyPipe } from "./app-currency.pipe";
import { AppFilterPipe } from "./app-filter.pipe";

@NgModule({
  declarations: [
    MainFilterPipe,
    SelectSearchPipe,
    MomentPipe,
    SafePipe,
    AsurlPipe,
    CsErrorTooltipPipe,
    MessagePortalPipe,
    AppCurrencyPipe,
    AppFilterPipe,
  ],
  imports: [CommonModule],
  exports: [
    MainFilterPipe,
    SelectSearchPipe,
    MomentPipe,
    SafePipe,
    CsErrorTooltipPipe,
    MessagePortalPipe,
    AppCurrencyPipe,
    AppFilterPipe,
  ],
  providers: [CurrencyPipe],
})
export class MainPipeModule {}
