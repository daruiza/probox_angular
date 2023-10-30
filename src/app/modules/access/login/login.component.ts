import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IAlert } from 'src/app/models/IAlert';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

  public hide = signal<boolean>(false);
  public buttonAccept = signal<boolean>(false);

  public alert = signal<IAlert | undefined>(undefined);

  public loginForm: FormGroup = new FormGroup({});

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly activeModal: NgbActiveModal,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { super(translate, appService); }

  ngOnDestroy(): void {
    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.formConstructor();
  }

  formConstructor() {
    this.loginForm.addControl('email', new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(32)]
    }));
    this.loginForm.addControl('password', new FormControl('', {
      validators: [Validators.required, Validators.maxLength(32)]
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
        next: (acces) => {
          this.buttonAccept.set(false);
          this.userService.getUser().subscribe({
            next: (user) => {
              // ya se actualiza en el getUser()
              // this.userService.updatedUserBehavior({ ...user.data.user });
              this.activeModal.close({...user, ...acces});
            }
          })
        },
        error: (err) => {
          this.buttonAccept.set(false);
          this.alert.set({
            type: 'danger',
            message: err.error.message,
            title: 'Acceso Denegado',
          })
        },
        complete: () => {
          this.buttonAccept.set(false);
        }
      })
    }
  }
}
