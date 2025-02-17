import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-filter-button",
  templateUrl: "./filter-button.component.html",
  styleUrls: ["./filter-button.component.scss"],
})
export class FilterButtonComponent implements OnInit {
  isOpen = false;
  @Input()
  searchPanelTemplate: TemplateRef<any>;
  currentTemplate: TemplateRef<any>;
  @ViewChild("searchPanelDialog", { static: false })
  searchPanelDialog: TemplateRef<any>;
  @ViewChild("trigger", { static: false }) trigger: CdkOverlayOrigin;

  constructor(public data: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.currentTemplate = this.searchPanelTemplate;
  }

  openDialog() {
    this.dialog.open(this.searchPanelDialog, {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
    });
  }

  close() {
    this.isOpen = false;
    this.dialog.closeAll();
  }
}
