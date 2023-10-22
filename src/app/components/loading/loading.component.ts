import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/midleware/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @Input() class: string = 'blue-grey-theme';

  loadRefSuscription: Subscription | undefined;
  loadingSubject$!: Observable<boolean>;
  constructor(
    private cdref: ChangeDetectorRef,
    public readonly loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingSubject$ = this.loadingService.getLoadingSubject();
    this.loadRefSuscription = this.loadingService.getLoadingSubject().subscribe(res =>
      this.cdref.detectChanges()
    )
  }

  ngOnDestroy(): void {
    if (this.loadRefSuscription) { this.loadRefSuscription.unsubscribe(); }
  }
}
