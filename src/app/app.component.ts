import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./components/loading/loading.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, AppModule, LoadingComponent, SnackbarComponent]
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
