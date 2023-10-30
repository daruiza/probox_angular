import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IAlert } from 'src/app/models/IAlert';
import { IUser } from 'src/app/models/IUser';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/auth/user.service';
import { NacionalityService } from 'src/app/services/utils/nacionality.service';
import { ModalMapComponent } from '../../shared/modal-map/modal-map.component';
import { GeneralListService } from 'src/app/services/utils/generallist.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit, OnDestroy {

  public alert = signal<IAlert | undefined>(undefined);
  public buttonAccept = signal<boolean>(false);

  public user: IUser | undefined = undefined;
  // El Old User para activación de boton guardar ante un cambio
  public userFormOld!: any;
  public userForm!: FormGroup;

  public url: string | ArrayBuffer | null = null;

  public nationalities: any[] = []
  public storeNationalities: any[] = []

  public themes: any[] = []

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly activeModal: NgbActiveModal,
    private readonly modalService: NgbModal,
    private readonly userService: UserService,
    private readonly nacionalityService: NacionalityService,
    private readonly generalListService: GeneralListService,
    private readonly storageService: StorageService
  ) { super(translate, appService); }

  ngOnDestroy(): void {
    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.formConstructor().then(() => {
      this.callService();
    })
  }

  async formConstructor() {
    this.userForm = new FormGroup({});
    this.userForm.addControl('name', new FormControl('', {
      validators: [Validators.required, Validators.maxLength(32)]
    }));

    this.userForm.addControl('lastname', new FormControl('', {
      validators: [Validators.maxLength(32)]
    }));

    this.userForm.addControl('email', new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(10)]
    }));

    this.userForm.addControl('birthdate', new FormControl('', {
      validators: []
    }));

    this.userForm.addControl('nacionality', new FormControl('', {
      validators: []
    }));

    this.userForm.addControl('address', new FormControl('', {
      validators: []
    }));

    this.userForm.addControl('phone', new FormControl('', {
      validators: [Validators.minLength(10)]
    }));

    this.userForm.addControl('photo', new FormControl('', {
      validators: []
    }));

    this.userForm.addControl('rol_id', new FormControl('', {
      validators: [Validators.required]
    }));

    this.userForm.addControl('theme', new FormControl('', {
      validators: []
    }));

    this.userForm.addControl('password', new FormControl('', {
      validators: []
    }));
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      if (user) {
        console.log('user', user);

        this.user = { ...user };
        this.userForm.patchValue({
          ...this.user,
          nacionality: this.nationalities.find(el => el?.name === this.user?.nacionality),
          theme: this.themes.find(el => el?.name === this.user?.theme)
        }, { emitEvent: false })
        this.userFormOld = { ...this.userForm.value }
      }

    })
  }

  callService() {

    forkJoin([
      this.nacionalityService.getNationalities(),
      this.generalListService.getListByName('theme')
    ]).subscribe(([nationalities, themeList]) => {
      this.nationalities = nationalities;
      this.storeNationalities = nationalities;
      this.themes = themeList;
      this.getUser();
    })
  }

  // Sube el archivo hasta el backend
  onFileChanged(event: any) {
    const file = event.target.files[0] 
    console.log(file);
    // user/photo/FS6APt9SnyNtoRuSi3hVQgQqWy704H2w0f7faltR.png
    if (file) {
      this.storageService.postUpload('user/photo', file).subscribe(
        response => {
          console.log('postUpload', response);
        })
    }


    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
    }

  }

  inputEventNationality(event: any) {
    this.nationalities = this.storeNationalities.filter(el =>
      el.name.toLowerCase().includes(event.toLowerCase())
    )
  }

  // Eventos
  showAddressMap() {
    console.log('showAddressMap');
    const mapModal = this.modalService.open(ModalMapComponent);
    // componentInstance es para asignar inputs y para escuchar outputs
    // mapModal.componentInstance
    mapModal.result.then(result => {
      console.log(result);
    }
    );
  }

  //Validaciones
  oldChanges() {
    return JSON.stringify(this.userFormOld) == JSON.stringify(this.userForm.value)
  }

  onSubmit(event: any) {

    if (this.userForm.valid) {

      this.buttonAccept.set(true);
      this.userService.updateUser({
        id: this.user?.id ?? null,
        ...this.userForm.value,
        nacionality: this.userForm.value?.nacionality?.name ?? '',
        theme: this.userForm.value?.theme?.name ?? ''
      }).subscribe({
        next: (user) => {
          this.activeModal.close(user);
        },
        error: (error) => {
          this.alert.set({
            type: 'danger',
            message: error.error.message,
            title: 'Actualizacción denegada',
          })
        },
        complete: () => this.buttonAccept.set(false)
      })
    }
  }


}
