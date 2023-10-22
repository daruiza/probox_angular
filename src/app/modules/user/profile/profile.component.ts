import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IAlert } from 'src/app/models/IAlert';
import { IUser } from 'src/app/models/IUser';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit, OnDestroy {

  public alert = signal<IAlert | undefined>(undefined);
  public user: IUser | undefined = undefined;

  public userForm: FormGroup = new FormGroup({});

  public url: string | ArrayBuffer | null = null;
  // public url: string | ArrayBuffer | null = `http://localhost/probox_laravel/storage/app/public/images/profile/user.png`;
  // public url: string | ArrayBuffer | null = `http://127.0.0.1:8090/storage/app/public/images/user.png`;
  // public url: string | ArrayBuffer | null = `${window.location.origin}/src/assets/storage/images/profile/user.png`;
  // public url: string | ArrayBuffer | null = `assets/storage/images/profile/user.png`;

  userSuscription: Subscription | undefined;

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly activeModal: NgbActiveModal,
    private readonly userService: UserService,
  ) { super(translate, appService); }

  ngOnDestroy(): void {
    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }

    if (this.userSuscription) {
      this.userSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.formConstructor();
    this.suscriptions();
  }

  formConstructor() {
    this.userForm.addControl('name', new FormControl('', {
      validators: [Validators.required, Validators.maxLength(32)]
    }));

    this.userForm.addControl('lastname', new FormControl('', {
      validators: [Validators.required, Validators.maxLength(32)]
    }));

    this.userForm.addControl('email', new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(10)]
    }));

    this.userForm.addControl('birthdate', new FormControl('', {
      validators: [Validators.required,]
    }));

    this.userForm.addControl('nacionality', new FormControl('', {
      validators: [Validators.required,]
    }));

    this.userForm.addControl('phone', new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)]
    }));

    this.userForm.addControl('photo', new FormControl('', {
      validators: []
    }));

    this.userForm.addControl('rol', new FormControl('', {
      validators: [Validators.required]
    }));

    this.userForm.addControl('theme', new FormControl('', {
      validators: [Validators.required]
    }));    

    this.userForm.addControl('password', new FormControl('', {
      validators: [Validators.required]
    }));
  }

  suscriptions() {
    this.userSuscription = this.userService.getUser().subscribe((user) => {
      console.log('user: ', user);
      if (user) {
        this.user = user;
        this.userForm.patchValue(user,{emitEvent: false})
      }

    })
  }

  onFileChanged(event: any) {
    console.log(
      event.target.files[0]
    );

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
    }

  }


}
