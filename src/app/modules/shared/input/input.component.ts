import { Component, Self, Optional, forwardRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseComponent implements OnInit, ControlValueAccessor {

  // Documentación
  // https://stackblitz.com/edit/angular-8fp5qy?file=src%2Fapp%2Fapp-unique-name-text-box%2Fapp-unique-name-text-box.component.css,src%2Fapp%2Fapp-unique-name-text-box%2Fapp-unique-name-text-box.component.html
  @Input() type:
    'datetime-local' |
    'color' |
    'date' |
    'email' |
    'month' |
    'number' |
    'password' |
    'search' |
    'tel' |
    'text' |
    'time' |
    'url' |
    'week' = 'text'
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() icon?: any;
  @Input() readonly: boolean = false;

  @Output() onIconClick = new EventEmitter<any>();

  inputRef: FormControl = new FormControl('');
  isDisabled: boolean = false;

  get hasError(): boolean {
    return Object.keys(this.ngControl.errors ?? []).length !== 0
  }

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
  ) {
    super(translate, appService);
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.inputRef.valueChanges.subscribe(
      val => this.setInputValue(val)
    );

    const validators = this.ngControl?.control?.validator;
    this.inputRef.setValidators(validators ? validators : null);
    // Genara un error de 7 pasos
    // this.inputRef.updateValueAndValidity();
  }

  onChange = (_: any) => { }
  onTouched = () => { }

  setInputValue(val = '') {
    this.inputRef.patchValue(val, { emitEvent: false });
    this.onChange(val);
    this.onTouched();
  }

  set inputValue(val: any) {
    this.onChange(val)
    this.onTouched()
  }

  writeValue(obj: any): void {
    this.inputRef.patchValue(obj);
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

  onInputBlur() {
    this.onTouched()
  }


  onIconClickEvent(event: Event) {
    // Para que en movil no emita evento de campo/input
    // event.preventDefault();
    this.onIconClick.emit(event)
  }

  // Vlidations
  errorMatField() {
    return this.ngControl.control?.touched && this.ngControl.errors?.['required'];
  }

}
