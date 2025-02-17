import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
} from "@angular/core";
import { MessageData, MESSAGE_DIALOG_DATA } from "./message-portal-interface";
import { MessagePortalOverlayRef } from "./message-portal-overlay";
// import { MessagePortalOverlayRef } from './message-portal-overlay';
import { MessagePortalComponent } from "./message-portal.component";
import { BreakpointObserver } from "@angular/cdk/layout";

interface messagePortalDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  width?: string;
  data?: MessageData;
}

const DEFAULT_CONFIG: messagePortalDialogConfig = {
  width: "100%",
  hasBackdrop: true,
  backdropClass: "bg-transparent",
  panelClass: "message-portal",
  data: null,
};

@Injectable({
  providedIn: "root",
})
export class MessagePortalService {
  // dialogRef: any;
  constructor(
    private overlay: Overlay,
    private injector: Injector,
    public breakpointObserver: BreakpointObserver
  ) {}

  open(config: messagePortalDialogConfig = {}, bottom?) {
    let isMobile = this.breakpointObserver.isMatched("(max-width: 1199px)");
    const xbottom = isMobile ? "0px" : bottom ? bottom : "30px";
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(dialogConfig, xbottom);

    // Instantiate remote control
    const dialogRef = new MessagePortalOverlayRef(overlayRef);

    const messagePortal = this.attachDialogContainer(
      overlayRef,
      dialogConfig,
      dialogRef
    );
    // overlayRef.attach(messagePortal);
    overlayRef.backdropClick().subscribe((_) => dialogRef.close());
    return dialogRef;
  }

  private getOverlayConfig(
    config: messagePortalDialogConfig,
    xbottom
  ): OverlayConfig {
    let bottomValue = xbottom;
    if (xbottom === "0") {
      bottomValue = "0";
    }
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
      .bottom(bottomValue)
      .left("0")
      .right("0");

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }
  private createOverlay(config: messagePortalDialogConfig, xbottom) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config, xbottom);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(
    overlayRef: OverlayRef,
    config: messagePortalDialogConfig,
    dialogRef: MessagePortalOverlayRef
  ) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(
      MessagePortalComponent,
      null,
      injector
    );
    const containerRef: ComponentRef<MessagePortalComponent> =
      overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(
    config: messagePortalDialogConfig,
    dialogRef: MessagePortalOverlayRef
  ): Injector {
    return Injector.create({
      providers: [
        { provide: MessagePortalOverlayRef, useValue: dialogRef },
        { provide: MESSAGE_DIALOG_DATA, useValue: config.data },
      ],
    });
  }
}
