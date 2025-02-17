import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-sandbox",
  templateUrl: "./sandbox.component.html",
  styleUrls: ["./sandbox.component.scss"],
})
export class SandboxComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SandboxComponent>) {}

  ngOnInit(): void {}

  doClose() {
    this.dialogRef.close();
  }
}
