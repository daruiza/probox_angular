import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnDestroy, OnInit {

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly router: Router) {
    super(translate, appService);    
  }

  ngOnDestroy(): void {
    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }
  }

  ngOnInit(): void { }

  toWelcome() {
    this.router.navigate(['/home/welcome']);
  }

}
