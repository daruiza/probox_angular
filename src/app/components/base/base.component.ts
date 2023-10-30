import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  translateSuscription: Subscription | undefined;

  constructor(
    public readonly translate: TranslateService,
    public readonly appService: AppService
  ) {
    this.translateSuscription = this.appService
      .getTranslateSubject()
      .subscribe((res) => {
        this.translate.setDefaultLang(res);

      })
  }

}
