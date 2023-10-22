import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'probox_angular';

  public get appService(): AppService {
    return this._appService;
  }

  constructor(
    private translate: TranslateService,
    private readonly _appService: AppService,) {
  }
  ngOnInit(): void {
    this.translate.setDefaultLang(this.appService.translateDefault);
  }
}
