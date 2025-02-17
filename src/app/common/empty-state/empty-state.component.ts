import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() img = 'assets/svg/no-data.svg';
  @Input() title = 'No records found';
  @Input() subtitle = 'Try adjusting your search or filter options to find what you\'re looking for';
  constructor() { }

  ngOnInit(): void {
  }

}
