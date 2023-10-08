import { Component, Self, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }]
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => InputComponent),
  //     multi: true
  //   }
  // ]
})
export class InputComponent implements ControlValueAccessor {

  // inputValue: any;
  isDisabled: boolean = false;

  // constructor(
  //   @Self() @Optional() private ngControl: NgControl
  // ) {
  //   this.ngControl.valueAccessor = this;
  // }

  onChange = (_: any) => { }
  onTouched = () => { }

  set inputValue(val: any) {
    // this.field = val
    this.onChange(val)
    this.onTouched()
  }


  writeValue(obj: any): void {
    this.inputValue = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
