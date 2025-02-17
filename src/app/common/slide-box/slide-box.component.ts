import { CdkStepper, StepContentPositionState } from '@angular/cdk/stepper';
import { AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-slide-box',
  templateUrl: './slide-box.component.html',
  styleUrls: ['./slide-box.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: SlideBoxComponent }],
  animations: [trigger('stepTransition', [
    state('previous', style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0, position: 'absolute', zIndex: 1 })),
    state('current', style({ transform: 'translate3d(0, 0, 0)', opacity: 1, position: 'relative', zIndex: 2 })),
    state('next', style({ transform: 'translate3d(100%, 0, 0)', opacity: 0, position: 'absolute', zIndex: 1 })),
    transition('* => *', animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)'))
  ])],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideBoxComponent extends CdkStepper implements OnInit {
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();
  _animationDone = new Subject<AnimationEvent>();

  ngOnInit(): void {
    setTimeout(() => {
      this.startAnimation();
    }, 400);
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }

  startAnimation() {
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
    this._animationDone.pipe(
      distinctUntilChanged((x, y) => {
        return x.fromState === y.fromState && x.toState === y.toState;
      }),
      takeUntil(this._destroyed)
    ).subscribe(event => {
      if ((event.toState as StepContentPositionState) === 'current') {
        this.animationDone.emit();
      }
    });
  }

}
