import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { ImageCropDialogComponent } from "./image-crop-dialog/image-crop-dialog.component";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
  @Input() public label: any = "";
  @Input() public mandatory: any = false;
  @Input() public dname: any = "";
  @Input() public filePath: any = "";
  @Input() public data: any;
  @Input() public uploaded = false;
  @Input() public expanded = false;
  @Input() public accept = "";
  @Input() public sublabel = "";
  @Input() public crop = false;
  @ViewChild("nativeFileUpload", { static: false })
  navtiveFileUpload: ElementRef;
  @ViewChild("fileInput", { static: false })
  fileInput: ElementRef;
  @Output("onload") onload: EventEmitter<any> = new EventEmitter();
  @Output("onclear") onclear: EventEmitter<any> = new EventEmitter();

  loadingNow = false;

  @Input() public xFile: any = {
    fileName: "",
    fileType: "",
    fileSize: 0,
    relativePath: "",
    istrFileContent: "",
  };
  @Input() public file: any = {
    fileName: "",
    fileType: "",
    fileSize: 0,
    relativePath: "",
    istrFileContent: "",
  };

  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = errorTrue || false;
  }
  get errorTrue() {
    return this.errorTrueNow;
  }
  @Input()
  set loading(loading: boolean) {
    this.loadingNow = loading || false;
  }
  get loading() {
    return this.loadingNow;
  }
  disabledNow = false;
  @Input()
  set disabled(disabled: boolean) {
    this.disabledNow = disabled || false;
  }
  get disabled() {
    return this.disabledNow;
  }

  errorText = "";

  constructor(
    public appSettingService: AppSettingsService,
    public dialog: MatDialog
  ) {
    // super();
  }

  ngOnInit(): void {}

  // ngOnChanges(changes: SimpleChanges) {
  //   for (let propName in changes) {
  //     if (propName === 'uploaded') {
  //       if(this.uploaded){
  //         this.xFile = this.file;
  //       }
  //       console.log(this.uploaded);
  //     }
  //   }
  //   // console.log(changes);
  // }

  async loadImageFromDevice(event) {
    this.errorText = "";
    const file = event.target.files[0];
    // console.log(file.size, this.appSettingService.environment.maxFileSize);
    if (file.size > this.appSettingService.environment.maxFileSize) {
      this.errorText = this.appSettingService.environment.fileSizeErrorMsg;
      this.removeFileUpload();
      return;
    }
    // let finalImage = file

    this.xFile = {
      fileName: file.name,
      fileType: file.name.substring(file.name.lastIndexOf(".") + 1),
      fileSize: file.size,
      relativePath: "",
      istrFileContent: "",
    };

    // console.log(event);
    // const file = event.target.files[0];
    const reader = new FileReader();
    // let FileName = event.target.files[0].name;
    // let FileType = FileName.substring(FileName.lastIndexOf('.') + 1);
    // let FileSizeinBytes = event.target.files[0].size;
    // let sizeInKb = FileSizeinBytes / 1000;
    // let sizeInMb = sizeInKb / 1024;
    // let ImageSize = sizeInMb;

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const img: any = reader.result;

      if (this.crop) {
        let cropedImage: any = await this.openCropDialog(img);
        this.xFile.fileSize = cropedImage.size;
        const cropReader = new FileReader();
        cropReader.readAsDataURL(cropedImage);
        cropReader.onload = async () => {
          const cropimg: any = cropReader.result;
          this.xFile.istrFileContent = cropimg;
          console.log(this.xFile);
          this.onFileLoad(this.xFile);
        };
        cropReader.onerror = (error) => {
          console.log(error);
        };
      } else {
        this.xFile.istrFileContent = img;
        this.onFileLoad(this.xFile);
      }
      // this.data[this.dname] = file.name;
      // this.data[this.filePath] = img;
    };
    reader.onerror = (error) => {
      console.log(error);
      //  this.general.openMsg('Error has been occured,while selecting the file.', 'danger');
    };
  }

  removeFileUpload() {
    // console.log(this.navtiveFileUpload);
    this.xFile = {
      fileName: "",
      fileType: "",
      fileSize: 0,
      relativePath: "",
      istrFileContent: "",
    };
    this.fileInput.nativeElement.value = "";
  }

  onFileLoad(val) {
    this.onload.next(val);
  }

  triggerClick() {
    if (!this.disabledNow) {
      this.navtiveFileUpload.nativeElement.click();
    }
  }

  clear() {
    this.removeFileUpload();
    // this.onclear.next();
    this.onclear.next(this.data);
  }

  async openCropDialog(image: any) {
    return new Promise((resolve: any) => {
      const dialogRef = this.dialog.open(ImageCropDialogComponent, {
        width: "1024px",
        height: "600px",
        hasBackdrop: true,
        disableClose: true,
        data: {
          image: image,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          resolve(result);
        } else {
          this.removeFileUpload();
        }
      });
    });
  }
}
