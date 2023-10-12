import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() class: string = 'blue-grey-theme';
  loadingSubject$!: Observable<boolean>;
  constructor(public readonly loadingService: LoadingService){
    this.loadingSubject$ = this.loadingService.getLoadingSubject();
  }
}
