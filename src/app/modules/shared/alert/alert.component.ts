import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IAlert } from 'src/app/models/IAlert';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends BaseComponent implements OnChanges {

  @Input() alert: IAlert | undefined = undefined;
  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    ) {
      super(translate, appService);
    }
    
    ngOnDestroy(): void {
      if (this.translateSuscription) {
        this.translateSuscription.unsubscribe();
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alert']?.currentValue?.time) {
      setTimeout(() => this.close(), changes['alert'].currentValue.time)
    }
  }

  close($event?: any) {
    this.alert = undefined
  }
}
