import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: './image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.scss']
})
export class ImageCropDialogComponent implements OnInit, AfterViewInit {
  imageSrc = "";
  cropper: any = "";
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<ImageCropDialogComponent>) {
    this.imageSrc = dialogData.image;

  }
  ngAfterViewInit(): void {
    let imageId: any = document.getElementById('imagetocrop');
    this.cropper = new Cropper(imageId, {
      crop(event) { },
      ready() { }
    })
  }

  ngOnInit(): void {

  }

  closeDialog(val: any) {
    this.dialogRef.close(val);
  }


  doCropImage() {
    this.cropper.getCroppedCanvas().toBlob((blob) => {
      this.dialogRef.close(blob);
    });
  }

}
