import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortalComponent } from "./portal.component";
import { ShareModule } from "../common/share/share.module";
import { PortalRoutingModule } from "./portal-routing.module";
import { PortalSearchComponent } from "./portal-search/portal-search.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { PortalSearchModule } from "./portal-search/portal-search.module";
import { LiveBotModule } from "./live-bot/live-bot.module";

@NgModule({
  declarations: [PortalComponent, SideBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    PortalRoutingModule,
    PortalSearchModule,
    ShareModule,
    LiveBotModule,
  ],
})
export class PortalModule {}
