import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { SnackbarComponent } from '../common/snackbar/snackbar.component';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  configSuccess: MatSnackBarConfig = {
    duration: 5000000000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: 'bg-danger'
  };
  online$: Observable<boolean>;
  constructor(public snackBar: MatSnackBar
  ) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    // this.networkStatus();
  }

  public networkStatus() {
    this.online$.subscribe(value => {
      console.log(value);
      if (!value) {
        this.openAlert(value);
      } else {
        this.closeAlert();
      }
      // console.log(value);
    });
  }

  openAlert(val) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: 'You are Offline',
        button: false
      },
      ...this.configSuccess
    });
  }

  closeAlert() {
    this.snackBar.dismiss();
  }

}
