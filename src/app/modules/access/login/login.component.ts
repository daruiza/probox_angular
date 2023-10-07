import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = false;
  buttonAccept: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  get email(): FormControl {
    return this.loginForm.controls['email'] as FormControl;
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.formConstructor();
  }

  formConstructor() {
    this.loginForm.addControl('email', new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(10)]
    }));
    this.loginForm.addControl('password', new FormControl('', {
      validators: [Validators.required]
    }));
  }

  onSubmit($event: any) {
    console.log(this.loginForm);
    console.log(this.email.errors);
    
    
  }
}
