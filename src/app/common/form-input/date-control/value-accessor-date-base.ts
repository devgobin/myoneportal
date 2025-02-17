import { ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

export class ValueAccessorDateBase<T> implements ControlValueAccessor {
    public innerValue: string;
    public changed = new Array<(value: string) => void>();
    public touched = new Array<() => void>();
    public routerInfo: BehaviorSubject<boolean>;
    constructor() {
        this.routerInfo = new BehaviorSubject<boolean>(false);
    }
    getValue(): Observable<boolean> {
        return this.routerInfo.asObservable();
    }
    setValue(newValue): void {
        this.routerInfo.next(newValue);
    }
    get value(): string {
        return this.innerValue;
    }
    set value(value: string) {
        // console.log(value); 
        if (this.innerValue !== value) {
            this.innerValue = value;

            this.changed.forEach(f => f(value));
        }
    }
    touch() {
        this.touched.forEach(f => f());
    }
    writeValue(value: string) {
        // console.log('write: ' + value);
        this.innerValue = value;
        this.setValue(true);

    }
    onChange(value: string){
        // console.log('change: ' + value);
    }
    registerOnChange(fn: (value: string) => void) {
        // console.log('value : ' + fn);
        this.changed.push(fn);
    }
    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }
}

