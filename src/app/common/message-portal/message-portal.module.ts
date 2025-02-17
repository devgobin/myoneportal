import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePortalComponent } from './message-portal.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MainPipeModule } from 'src/app/pipe/main-pipe.module';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [MessagePortalComponent],
  entryComponents: [MessagePortalComponent],
  imports: [CommonModule, PortalModule, OverlayModule, MatRippleModule, MatButtonModule, MainPipeModule],
  exports: [MessagePortalComponent, PortalModule, OverlayModule],
})
export class MessagePortalModule {}
