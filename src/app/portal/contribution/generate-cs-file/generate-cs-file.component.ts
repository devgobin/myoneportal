import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { MatDialog } from '@angular/material/dialog';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { newcontributionservice } from '../new-contribution/new-contribution/new-contribution.service';
import { AppGlobal } from 'src/app/constants';
import { NgForm } from '@angular/forms';
import { ViewPdfComponent } from 'src/app/common/view-pdf/view-pdf.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generate-cs-file',
  templateUrl: './generate-cs-file.component.html',
  styleUrls: ['./generate-cs-file.component.scss']
})
export class GenerateCsFileComponent implements OnInit {
  pageId = "GCSFL";
  isOpen = false;
  displayedColumns: string[] = ['id', 'file', 'date', 'status', 'action'];
  dataSource: any = new MatTableDataSource();
  activeIndex: number;
  btnClicked = false;
  errorTrue = false;
  @ViewChild("l", { static: false }) public l: NgForm;

  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public fullspinner: FullSpinnerService,
    public service: newcontributionservice
  ) {
    this.data.headerName = {
      screenName: 'CS Generate File',
      paths: [
        {
          name: 'Home',
          link: '#',
        },
        {
          name: 'CS',
          link: '',
        },
        {
          name: 'Generate',
          link: '',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.GetCSHeaderInitialData();
  }
  active(row) {
    this.activeIndex = row;
  }

  GetCSHeaderInitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contribution.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.DDL[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.createData();
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data.getData(AppGlobal.apiPaths.contribution.createnewcsfilegeneration).then(
      (success: any) => {
        this.service.createdetail = success;
        if (this.service.DDL.DDLCSCodeValue != null && this.service.DDL.DDLCSCodeValue.length > 0)
          this.service.createdetail.csCode = this.service.DDL.DDLCSCodeValue[0].constant;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  onsubmit(h) {
    if (h.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data.postData(
        AppGlobal.apiPaths.contribution.generatecsfile,
        this.service.createdetail
      )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.viewcsfile(success);
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  viewcsfile(val) {
    this.fullspinner.empty.next(true);
    this.data
      .pdf(AppGlobal.apiPaths.contribution.viewgeneratecsfile, val)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.openPDFViewer(success);
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }
  openPDFViewer(xurl) {
    if (this.data.isMobile) {
      let link = document.createElement('a');
      link.href = xurl;
      link.target = "_blank";
      link.download = "";
      // link.download = this.response.data + '_file.pdf';
      link.dispatchEvent(new MouseEvent('click'));
    } else {
      const dialogRef = this.dialog.open(ViewPdfComponent, {
        width: '100%',
        height: '85%',
        data: {
          url: xurl,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.logout();
        }
      });
    }
  }
}
