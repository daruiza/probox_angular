import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public hide = signal<boolean>(false);
  public buttonAccept = signal<boolean>(false);
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly authService: AuthService,
  ) { }

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

  // Comportamiento
  hideUpload() {
    this.hide.update(value => !value)
  }

  onSubmit($event: any) {
    if (this.loginForm.valid && !this.buttonAccept()) {
      this.buttonAccept.set(true);
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: (item) => {
          this.buttonAccept.set(false);
          console.log('next: ', item);
        },
        error: (err) => {
          this.buttonAccept.set(false);
          console.log('err: ', err)},
        complete: () => {
          this.buttonAccept.set(false);
          console.log("Observable completed");
        }
      })
    }
  }
}
