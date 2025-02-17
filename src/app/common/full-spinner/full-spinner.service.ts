import { Injectable } from '@angular/core';
import { FullSpinnerComponent, EmptySpinnerComponent } from './full-spinner.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';
import { mapTo, scan, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FullSpinnerService {
  private spinnerTopRef = this.cdkSpinnerCreate();
  private spinnerTopRefLight = this.cdkSpinnerCreateLight();
  spin: Subject<boolean> = new Subject();
  empty: Subject<boolean> = new Subject();
  constructor(
    private overlay: Overlay,
  ) {
    this.spin
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.showSpinner();
          } else if (res === 0) {
            // tslint:disable-next-line: no-unused-expression
            this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
          }
        }
      );
      this.empty
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.showEmptySpinner();
          } else if (res === 0) {
            // tslint:disable-next-line: no-unused-expression
            this.spinnerTopRefLight.hasAttached() ? this.stopEmptySpinner() : null;
          }
        }
      );
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }
  private cdkSpinnerCreateLight() {
    return this.overlay.create({
      width: '100%',
      hasBackdrop: true,
      backdropClass: 'no-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        // .centerHorizontally()
        // .centerVertically()
    });
  }

  private showEmptySpinner() {
    // console.log('attach');
    this.spinnerTopRefLight.attach(new ComponentPortal(EmptySpinnerComponent));
  }

  private showSpinner() {
    // console.log('attach');
    this.spinnerTopRef.attach(new ComponentPortal(FullSpinnerComponent));
  }

  private stopSpinner() {
    // console.log('dispose');
    this.spinnerTopRef.detach();
  }
  private stopEmptySpinner() {
    // console.log('dispose');
    this.spinnerTopRefLight.detach();
  }
}
