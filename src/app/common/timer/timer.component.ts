import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  location = '';
  hasLocation = false;
  time = '';

  constructor(
    public data: DataService
  ) { }

  ngOnInit(): void {
    this.getCoords();
    this.getTime();
  }

  getCoords() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (success) => {
          this.getLocation(success.coords.latitude, success.coords.longitude);
          // console.log(success);
        }, (error) => {
          this.hasLocation = false;
          // console.log(error);
        });

    } else {
      this.hasLocation = false;
    }
  }

  getLocation(lat, long) {
    this.data.getLocation(lat, long).then((success: any) => {
      // console.log(success);
      this.location = success.address.city + ', ' + success.address.country;
    }, (error) => {
      this.hasLocation = false;
    })
  }

  getTime() {
    this.time = moment().format('YYYY/MM/DD hh:mm a');
    // console.log(this.time);
    setTimeout(() => {
      this.getTime();
    }, 60000);
  }



}
