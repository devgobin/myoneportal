import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewerComponent } from './file-viewer.component';
import { ViewPdfModule } from '../view-pdf/view-pdf.module';
import { SingleImageViewerModule } from '../single-image-viewer/single-image-viewer.module';




@NgModule({
  declarations: [
    FileViewerComponent
  ],
  imports: [
    CommonModule,
    ViewPdfModule,
    SingleImageViewerModule
  ],
  exports: [FileViewerComponent]
})
export class FileViewerModule { }
