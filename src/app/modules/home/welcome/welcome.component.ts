import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
export class WelcomeComponent implements OnInit, OnDestroy {

  public alert = signal<IAlert | undefined>(undefined);

  userSuscription: Subscription | undefined;

  constructor(
    private readonly translate: TranslateService,
    public readonly appService: AppService,
    public readonly userService: UserService,
  ) { this.ngOnInit() }

  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    // Este componente es solo accesible si se esta logueado

    this.userSuscription =
      this.userService.observableUser.subscribe((user: IUser | undefined) => {
        if (user) {
          this.alert.set({
            type: 'success',
            message: `Tu acceso ha sido exitoso`,
            title: `¡Bienvenid@ ${user?.name}`,
          })
        }

        // No hay necesidad dado que cualquier otro evento disparara el logout en cado de un 401
        // if (!user) {                  
        //   // Consultamos el usuario a back, en caso de no llegar bien se debe desloguear          
        //   // Con solo hacer la suscripción es suficiente, actuan 3 actores
        //   // 1. errors - snackbar
        //   // 2. user - actuliza usuario
        //   // 3 - auth  - desloguea ante un 401
        //   this.userService.getUser().subscribe();
        // }
      });


    this.alert.set({
      type: 'success',
      message: `Tu acceso ha sido exitoso`,
      title: `¡Bienvenid@`,
    })
  }

}
