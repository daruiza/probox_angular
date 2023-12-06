import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IAlert } from 'src/app/models/IAlert';
import { IUser } from 'src/app/models/IUser';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/auth/user.service';


interface Locale {
  localeCode: string;
  label: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends BaseComponent implements OnInit, OnDestroy {

  public alert = signal<IAlert | undefined>(undefined);

  userSuscription: Subscription | undefined;

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly userService: UserService,
  ) {
    super(translate, appService);
    this.ngOnInit()
  }

  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    // Este componente es solo accesible si se esta logueado

    // this.userSuscription =
    //   this.userService.observableUser.subscribe((user: IUser | undefined) => {
    //     if (user) {
    //       this.alert.set({
    //         type: 'success',
    //         message: `Tu acceso ha sido exitoso`,
    //         title: `¡Bienvenid@ ${user?.name}`,
    //       })
    //     }
    //   });

    // this.alert.set({
    //   type: 'success',
    //   message: `accesok`,
    //   title: `welcome`,
    // })
  }

}
