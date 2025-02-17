import { ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

export class ValueAccessorDateBase<T> implements ControlValueAccessor {
    private innerValue: string;
    private changed = new Array<(value: string) => void>();
    private touched = new Array<() => void>();
    get value(): string {
        // console.log('get: ' + this.innerValue);
        // return moment(this.innerValue, 'YYYY-MM-DD').format('DD/MM/YYYY');
        return this.innerValue;
    }
    set value(value: string) {
        if (value !== '') {
            const newValue = moment(value).format('YYYY-MM-DD');
            if (this.innerValue !== newValue) {
                this.innerValue = newValue;
                this.changed.forEach(f => f(moment(newValue).format('DD/MM/YYYY')));
            }
        } else {
            this.innerValue = '';
            this.changed.forEach(f => f(''));
        }
    }
    touch() {
        this.touched.forEach(f => f());
    }
    writeValue(value: string) {
        // console.log('write: ' + value);
        if (value !== '') {
            const newValue = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
            this.innerValue = newValue;
        } else {
            this.innerValue = '';
        }
        // console.log('write2: ' + this.innerValue);
    }
    registerOnChange(fn: (value: string) => void) {
        this.changed.push(fn);
    }
    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }
}
