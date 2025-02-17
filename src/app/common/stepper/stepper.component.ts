import { CdkStepper, StepContentPositionState } from "@angular/cdk/stepper";
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent,
} from "@angular/animations";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil, distinctUntilChanged } from "rxjs/operators";
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  animations: [
    trigger("stepTransition", [
      state(
        "previous",
        style({
          transform: "translate3d(0, -100%, 0)",
          opacity: 0,
          position: "absolute",
          zIndex: 1,
        })
      ),
      state(
        "current",
        style({
          transform: "translate3d(0, 0, 0)",
          opacity: 1,
          position: "relative",
          zIndex: 2,
        })
      ),
      state(
        "next",
        style({
          transform: "translate3d(0, 100%, 0)",
          opacity: 0,
          position: "absolute",
          zIndex: 1,
        })
      ),
      transition("* => *", animate("1000ms cubic-bezier(0.35, 0, 0.25, 1)")),
    ]),
    trigger("stepChild", [
      state("previous", style({ display: "none" })),
      state("current", style({ display: "block" })),
      state("next", style({ display: "none" })),
      transition("* => *", animate("10ms cubic-bezier(0.35, 0, 0.25, 1)")),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() horizontal = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Output()
  readonly animationDone: EventEmitter<void> = new EventEmitter<void>();
  _animationDone = new Subject<AnimationEvent>();

  @ViewChild("stepperlist") stepperlist!: ElementRef;

  ngOnInit(): void {
    setTimeout(() => {
      // this.steps.
      this.startAnimation();
    }, 400);
    this.selectionChange.subscribe((val: any) => {
      let listId = "xsteps" + val.selectedIndex;
      let topPos = document.getElementById(listId).offsetTop;
      this.scrollTo(this.stepperlist.nativeElement, topPos - 30, 600);
    });
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }

  startAnimation() {
    this.steps.changes
      .pipe(takeUntil(this._destroyed))
      .subscribe((val: any) => {
        console.log(val);
        this._stateChanged();
      });
    this._animationDone
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        }),
        takeUntil(this._destroyed)
      )
      .subscribe((event) => {
        if ((event.toState as StepContentPositionState) === "current") {
          this.animationDone.emit();

          // this.stepperlist.nativeElement.scrollIntoView(window.document.getElementById(listId));
          // console.log(this.selectedIndex);
        }
      });
  }

  scrollTo(element, to, duration) {
    let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    let animateScroll = () => {
      currentTime += increment;
      let val = this.simpeCalculate(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  //t = current time
  //b = start value
  //c = change in value
  //d = duration

  simpeCalculate(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
}
