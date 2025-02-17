import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-single-image-viewer',
  templateUrl: './single-image-viewer.component.html',
  styleUrls: ['./single-image-viewer.component.scss']
})
export class SingleImageViewerComponent implements OnInit {

  private overlayRef!: OverlayRef;
  @Input() filePath: any = "";
  @Input() fileName: any = "";
  @ViewChild("expandedImages", { static: false })
  expandedImages!: TemplateRef<any>;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
  ) {

  }

  ngOnInit(): void {

  }

  download() {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.filePath;
    downloadLink.download = this.fileName;
    downloadLink.click();

  }

  imageView(path, filename) {
    this.filePath = path;
    this.fileName = filename;
    this.createOverlay();
  }

  createOverlay() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true
    });
    this.overlayRef.backdropClick().subscribe((_) => this.detachOverlay());
    this.attachOverlay();
  }

  attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const overlayRef = this.overlay.create();
      const imageView = new TemplatePortal(
        this.expandedImages,
        this.vcr
      );
      this.overlayRef.attach(imageView);
      this.imageExpandedView();
    } else {
      this.detachOverlay();
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      setTimeout(() => {
        this.overlayRef.detach();
        setTimeout(() => {
          this.overlayRef.dispose();
        }, 1000);
      }, 600);
    }
  }

  close() {
    this.detachOverlay();
  }

  imageExpandedView() {
    // console.log(imgList, i);
  }
}
