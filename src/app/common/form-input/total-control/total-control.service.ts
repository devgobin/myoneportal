import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalControlService {
  public arrayChange!: BehaviorSubject<boolean>;
  constructor() {
    this.arrayChange = new BehaviorSubject<boolean>(false);
  }

  getValue(): Observable<boolean> {
    return this.arrayChange.asObservable();
  }
  setValue(newValue: boolean): void {
    this.arrayChange.next(newValue);
  }
}

