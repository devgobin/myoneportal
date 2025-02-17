import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-spinner',
  templateUrl: './full-spinner.component.html',
  styleUrls: ['./full-spinner.component.scss']
})
export class FullSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-empty-spinner',
  template: '<div class="p-box pt68"><mat-progress-bar mode="indeterminate"></mat-progress-bar></div>',
  styleUrls: ['./full-spinner.component.scss']
})
export class EmptySpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
