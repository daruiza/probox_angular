import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { WelcomeComponent } from '../../home/welcome/welcome.component';
import { LoginComponent } from '../../access/login/login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public get appService(): AppService {
    return this._appService;
  }

  constructor(
    private readonly _appService: AppService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  openModalLogin() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(result => {
      console.log('result', result);
    }, reason => { console.log('reason', reason); })

  }

  changeTheme(theme: string) {
    this.appService.setTheme(theme);
  }

}
