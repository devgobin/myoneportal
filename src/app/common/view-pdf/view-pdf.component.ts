import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafePipe } from 'src/app/pipe/safe.pipe';

export interface PDFData {
  url: string;
}

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss'],
})
export class ViewPdfComponent implements OnInit {
  isImage = false;
  isBase64 = false;
  constructor(
    public dialogRef: MatDialogRef<ViewPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PDFData
  ) {
    if (data.url.includes('data:')) {
      this.isBase64 = true;
      if (data.url.includes('data:image/')) {
        this.isImage = true;
      }
    }
    // console.log(this.data);
  }

  ngOnInit(): void { }
}
