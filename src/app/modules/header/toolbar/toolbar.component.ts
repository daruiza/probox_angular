import { Component, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  public get appService(): AppService {
    return this._appService;
  }

  // @ViewChild('pop') public popover: NgbPopover;

  constructor(
    private readonly _appService: AppService,
  ){

  }

  changeTheme(theme: string){
    this.appService.setTheme(theme);    
  }

}
