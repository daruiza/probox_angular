import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() bindValue: string = '';
  @Input() bindLabel: string = '';
  @Input() appendTo: string = '';
  @Input() label?: string;
  @Input() loading: boolean = false;
  @Input() placeholder: string = '';
  @Input() hint?: string;
  @Input() icon?: any;
  @Input() items?: any = [];

  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() scrollEndEvent: EventEmitter<any> = new EventEmitter<any>();

  inputRef: FormControl = new FormControl('');
  isDisabled: boolean = false;

  public selectInput$ = new BehaviorSubject<string>('');

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    private config: NgSelectConfig
  ) {
    this.config.typeToSearchText = 'No se hallaron elementos';
    this.config.loadingText = 'Cargando...';
    this.ngControl.valueAccessor = this;

  }

  ngOnInit(): void {

    this.suscriptions();

    const validators = this.ngControl?.control?.validator;
    this.inputRef.setValidators(validators ? validators : null);
  }

  onChange = (_: any) => { }
  onTouched = () => { }

  setInputValue(val = '') {
    this.inputRef.patchValue(val, { emitEvent: false });
    this.onChange(val);
    this.onTouched();
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

  suscriptions() {
    this.inputRef.valueChanges.subscribe(
      val => this.setInputValue(val)
    );

    this.selectInput$.subscribe((newTerm) => {
      this.inputEvent.emit(newTerm);
    });
  }

  onBlur() {
    if (this.inputRef.value) {
      this.onChange(null);
    }
    this.onTouched();
  }

  onSelectValue(value: any) {
    let selectValue = value;
    if (this.bindValue && value) {
      selectValue = value[this.bindValue];
    }
    this.onChange(selectValue);
    this.onTouched();
    this.selectEvent.emit(value);
  }

  elementSelectScrollToEnd(event: any) {
    this.scrollEndEvent.emit(event);
  }

}
