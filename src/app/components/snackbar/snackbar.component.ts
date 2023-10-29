import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackModel } from 'src/app/models/ISnackModel';
import { SnackBarService } from 'src/app/services/midleware/snackbar.service';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {

  @Input() class: string = 'blue-grey-theme';

  snackRefSuscription: Subscription | undefined;

  constructor(
    public readonly snackBarService: SnackBarService,
    private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.snackRefSuscription) {
      this.snackRefSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.snackRefSuscription =
      this.snackBarService.snackbar.subscribe((snack: ISnackModel) => {
        if (snack?.message) {
          console.log('snack', snack);
          this.openSnackBar(snack.message, snack.action, snack.onAction);
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
