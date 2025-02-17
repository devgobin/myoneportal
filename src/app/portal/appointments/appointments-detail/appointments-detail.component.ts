import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { FullSpinnerService } from '../../../common/full-spinner/full-spinner.service';
import { appointmentservice } from '../appointments.service';
import { AppGlobal } from 'src/app/constants';
import { SuccessAlertComponent } from 'src/app/common/success-alert/success-alert.component';
import { Router } from '@angular/router';
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";

export interface PeriodicElement {
  messageCode: string;
  message: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { messageCode: '354354', message: 'anything', },
]
@Component({
  selector: 'app-appointments-detail',
  templateUrl: './appointments-detail.component.html',
  styleUrls: ['./appointments-detail.component.scss']
})
export class AppointmentsDetailComponent implements OnInit, OnDestroy {
  pageId = "APPIN";
  isOpen = false;
  btnClicked = false;
  errorTrue = false;
  brancherrorTrue = false;
  inprogress = false;
  displayedColumns: string[] = ['messageCode', 'message',];
  activeIndex: number;
  dataSource = ELEMENT_DATA;
  timeintervel: any;
  resendText = '';
  countDownDate = new Date().getTime() + 0.5 * 60000;
  maxlength = 150;
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public fullspinner: FullSpinnerService,
    public router: Router,
    public service: appointmentservice) {
    this.data.headerName = {
      screenName: 'Appointments Detail',
      paths: [
        {
          name: 'Home',
          link: '#',
        },
        {
          name: 'Appointments',
          link: '',
        },
        {
          name: 'Detail',
          link: '',
        },
      ],
    };
  }
  ngOnDestroy(): void {
    if(this.timeintervel){
      clearInterval(this.timeintervel);
    }
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.init();
  }

  GetAppointmentInitialData() {
    if (this.data.token !== '') {
      this.fullspinner.empty.next(true);
      this.data.getData(AppGlobal.apiPaths.appointment.initialdata).then(
        (success: any) => {
          success.data.forEach((element) => {
            this.service.DDL[element.key] = element.value;
          });
          this.fullspinner.empty.next(false);
          if(this.service.createappointment.appointmentId === 0 ){
            this.createData();
          }
         else if(this.service.createappointment.appointmentId > 0){
            this.openAppointment();
          }
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
    }
    else {
      setTimeout(() => {
        this.GetAppointmentInitialData();
      }, 300);
    }
  }

  init() {
    this.fullspinner.empty.next(false);
    this.GetAppointmentInitialData();
    
  }


  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    if(this.timeintervel){
      clearInterval(this.timeintervel);
    }
    this.data.getData(AppGlobal.apiPaths.appointment.create).then(
      (success: any) => {
        this.service.createappointment = success;
        this.maxlength = this.service.createappointment.maxInfoContent;
        this.brancherrorTrue = false;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.setTimer();
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  opencancel(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to Cancel this Appointment ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelAppointment();
      }
    });
  }

  cancelAppointment() {

    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.createappointment,
    };
    
    this.data.postData(AppGlobal.apiPaths.appointment.cancel,this.service.createappointment).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.createappointment = success;
        this.btnClicked = false;
        this.service.createappointment.appointmentId = 0;
        this.successalert();
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  openAppointment() {

    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.createappointment.appointmentId,
    };
    
    this.data.postData(AppGlobal.apiPaths.appointment.open,obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.createappointment = success;

        this.btnClicked = true;
        this.data.successMesaage(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  loadtimeslots(val) {

    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.service.createappointment = val;
    this.service.createappointment.ilstbusAppointmentTimeslots = [];
    this.data.postData(AppGlobal.apiPaths.appointment.LoadSlots, this.service.createappointment).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.createappointment = success;

        this.btnClicked = false;
        this.data.successMesaage(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }



  saveAppointment(l) {
    if (l.valid) {
      let errorM: any = true;
      if(this.service.createappointment.meetingInformation.length > 0)
      {
      this.service.createappointment.ilstbusAppointmentTimeslots.forEach((element) => {
        if (element.isselected === "Y") {
          errorM = false;
        }
      });
      if (errorM === true) {
        this.data.errorMesaageOnly("Please select time slot");
        return;
      }
    }else{
      this.data.errorMesaageOnly("Please Enter Meeting Information");
      return;
    }
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data.postData(AppGlobal.apiPaths.appointment.save, this.service.createappointment).then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.createappointment = success;
          this.btnClicked = false;
          this.successalert();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
    }
    else {
      this.errorTrue = true;
      this.brancherrorTrue = true;
    }
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: this.service.createappointment.msg.infoMessage.msgDescription,
        Showbtn1: true,
        button1: "Ok",
        Showbtn2: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigateByUrl("/app/appointments-search");
      }
    });
  }

  active(row) {
    this.activeIndex = row;
  }

  setTime(index) {
    if (this.service.createappointment.branchValue !== '') {
      this.service.createappointment.ilstbusAppointmentTimeslots.forEach(element => {
        element.isselected = "N";
      });
      this.service.createappointment.ilstbusAppointmentTimeslots[index].isselected = 'Y';
      this.saveAppointmentReserve();
    }
    else {
      this.brancherrorTrue = true;
    }
  }

  saveAppointmentReserve() {
    this.fullspinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.appointment.saveReserve, this.service.createappointment).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.createappointment = success;
        this.data.successMesaage(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  setTimer() {
    this.inprogress = true;
    this.resendText = 'Time Left (0:' + this.service.createappointment.reserveTimeout + ')';
    let timeInSeconds = this.service.createappointment.reserveTimeout * 1000;
    this.countDownDate = new Date().getTime() + timeInSeconds;
    this.timeintervel = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = this.countDownDate - now;
      // console.log(distance);
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      this.resendText =
        'Time Left (' +
        minutes +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds) +
        ')';
      // 'Resend In ' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      //   + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text
      // console.log(distance);
      if (distance < 1000) {
        clearInterval(this.timeintervel);
        this.timeintervel = {};
        this.inprogress = false;
        this.fullspinner.empty.next(false);
        this.createData();
      }
    }, 1000);

  }

}
