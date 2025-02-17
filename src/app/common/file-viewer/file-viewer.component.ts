import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "src/app/service/data.service";
import { SingleImageViewerComponent } from "../single-image-viewer/single-image-viewer.component";
import { ViewPdfComponent } from "../view-pdf/view-pdf.component";
// import { SingleImageViewerComponent } from '../../single-image-viewer/single-image-viewer.component';

@Component({
  selector: "app-file-viewer",
  templateUrl: "./file-viewer.component.html",
  styleUrls: ["./file-viewer.component.scss"],
})
export class FileViewerComponent implements OnInit {
  loadingTrue = false;
  @Input() documentid = 0;
  @Input() document: any = {
    documentId: 0,
    documentName: "",
    fileType: "",
    fileSizeKb: 0,
    content: "",
    relativePath: "",
  };
  @ViewChild(SingleImageViewerComponent) imageViwer;
  constructor(public data: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDocumentImage() {
    this.loadingTrue = true;
    const obj = {
      data: this.documentid,
      // data1: this.document.fileTypeValue
    };
    // this.apiService.openDocumentImage(obj).subscribe((success) => {
    //   console.log(success);
    // })
    this.data
      .postDocumentData("requesttracker/ViewRequestAttachment", obj)
      .subscribe((success) => {
        console.log(success);
        const resp = new Blob([success], { type: success.type });
        const fileURL = URL.createObjectURL(resp);
        if (success.type === "application/pdf") {
          this.openPDFViewer(fileURL);
        } else if (success.type.includes("image")) {
          let imageviwer = this.imageViwer.imageView(
            fileURL,
            this.document.documentName
          );
        } else {
          const downloadLink = document.createElement("a");
          downloadLink.href = fileURL;
          downloadLink.download = this.document.documentName;
          downloadLink.click();
        }

        // console.log(fileURL);
        // this.openPDFViewer(fileURL);
      });
  }

  openPDFViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
