import { Injectable } from "@angular/core";
import { ISnackModel } from '../../models/ISnackModel';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SnackBarService {

    public snackbar!: Observable<any>;
    private snackBehavior = new BehaviorSubject<ISnackModel | undefined>(undefined);

    constructor() {
        this.snackbar = this.snackBehavior.asObservable();
    }


    updatedSnackBehavior(message: ISnackModel) {
        this.snackBehavior.next(message);
    }


}