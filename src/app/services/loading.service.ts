import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ISnackModel } from '../models/ISnackModel';
// import { ISnackModel } from 'src/app/model/ISnackModel';

@Injectable({ providedIn: 'root' })
export class LoadingService {

    public loading: boolean;
    public arrayRequest: number[] = [];
    public loadingSubject = new Subject<boolean>();
    public snackbar!: Observable<any>;
    private snackBehavior = new BehaviorSubject<ISnackModel | undefined>(undefined);

    constructor() {
        this.loading = false;
        this.snackbar = this.snackBehavior.asObservable();
    }

    togleLoading() {
        this.loading = !this.loading;
    }

    showTogleLoadingSubject() {
        this.arrayRequest.push(1);
        this.loadingSubject.next(true);
    }

    hideTogleLoadingSubject() {
        this.arrayRequest.pop();
        if (!this.arrayRequest.length) { this.loadingSubject.next(false); }
    }

    getLoadingSubject() {
        return this.loadingSubject.asObservable();
    }


    updatedSnackBehavior(message: ISnackModel) {
        this.snackBehavior.next(message);
    }


}
