import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IAlert } from 'src/app/models/IAlert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges {

  @Input() alert: IAlert | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alert']?.currentValue?.time) {
      setTimeout(() => this.close(), changes['alert'].currentValue.time)
    }
  }
  
  close($event?: any) {
    this.alert = undefined
  }
}
