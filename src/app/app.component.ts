import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'probox_angular';

  public get appService(): AppService {
    return this._appService;
  }

  constructor(private readonly _appService: AppService,) { }
}
