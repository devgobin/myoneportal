import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })

export class MessagePortalOverlayRef {
  constructor(private overlayRef: OverlayRef) {}
  closing = false;
  close(): void {
    this.closing = true;
    setTimeout(() => {
      this.overlayRef.dispose();
      this.closing = false;
    }, 1000);
  }
}
