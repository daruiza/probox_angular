import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { LoginComponent } from '../../access/login/login.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ProfileComponent } from '../../user/profile/profile.component';
import { UserService } from 'src/app/services/auth/user.service';
import { SnackBarService } from 'src/app/services/midleware/snackbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends BaseComponent implements OnInit, OnDestroy {



  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly snackBarService: SnackBarService,
    public readonly authService: AuthService,
    public readonly userService: UserService,
  ) {
    super(translate, appService);
  }

  ngOnDestroy(): void {
    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }
  }

  ngOnInit() { }

  openModalLogin() {

    if (!this.authService.checkLogin()) {
      const modalRef = this.modalService.open(LoginComponent);
      modalRef.componentInstance.name = 'World';
      modalRef.result.then(result => {
        this.router.navigate(['/home/welcome']);
        this.snackBarService.updatedSnackBehavior({
          message: result?.message,
          action: 'Acceso Ok',
          onAction: () => { this.router.navigate(['/home/welcome']); }
        })
      }, reason => { console.log('reason', reason); })
    }

  }


  openModalProfile() {
    if (this.authService.checkLogin()) {
      const modalRef = this.modalService.open(ProfileComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(result => {
        console.log('result', result)
      }, reason => {
        console.log('reason', reason);
        modalRef.close();
      })
    }
  }

  callLogout() {
    this.authService.logout().subscribe((result) => {
      this.userService.updatedUserBehavior(undefined);
      this.snackBarService.updatedSnackBehavior({
        message: result?.message,
        action: 'Acceso Ok',
        onAction: () => { this.router.navigate(['/']); }
      })
      this.router.navigate(['/']);
    })
  }

  changeTheme(theme: string) {
    this.appService.setTheme(theme);
  }

  changeLanguage(language: string) {
    this.appService.changeTranslateSubject(language);
  }

}
