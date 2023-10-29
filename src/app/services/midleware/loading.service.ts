import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {

    public loading: boolean;
    public arrayRequest: number[] = [];
    public loadingSubject = new Subject<boolean>();
    
    constructor() {
        this.loading = false;        
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

}
