import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ShareModule } from "../common/share/share.module";
import { SearchComponent } from "./search/search.component";
import { SandboxModule } from "../common/sandbox/sandbox.module";
import { LiveBotModule } from "../portal/live-bot/live-bot.module";

@NgModule({
  declarations: [HomeComponent, SearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
    SandboxModule,
    LiveBotModule,
  ],
})
export class HomeModule {}
