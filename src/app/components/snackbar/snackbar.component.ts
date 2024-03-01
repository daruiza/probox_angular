import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackModel } from 'src/app/models/ISnackModel';
import { SnackBarService } from 'src/app/services/midleware/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';
import { BaseComponent } from '../base/base.component';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() class: string = 'blue-grey-theme';

  snackRefSuscription: Subscription | undefined;

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly snackBarService: SnackBarService,
    private snackBar: MatSnackBar) { super(translate, appService); }

  ngOnDestroy(): void {
    if (this.snackRefSuscription) {
      this.snackRefSuscription.unsubscribe();
    }

    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    console.log('SnackbarComponent');
    
    this.snackRefSuscription =
      this.snackBarService.snackbar.subscribe((snack: ISnackModel) => {
        if (snack?.message) {
          // Se comenta, el snack hace mucho ruido
          console.log('snack', snack);
          this.openSnackBar(this.translate.instant(snack.message), this.translate.instant(snack.action), snack.onAction);
        }
      });
  }

  // onAction es una funcion flecha
  openSnackBar(message: string, action: string, onAction: any = null) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 9000 });
    if (onAction) {
      snackBarRef.onAction().subscribe(onAction)
    }
  }

}
