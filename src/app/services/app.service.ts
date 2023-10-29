import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public theme: string;
  public app: any;
  
  public translateDefault: string = 'en';
  public translateSubject = new Subject<string>();

  constructor() {
    this.theme = 'blue-grey-theme';
    this.app = {
      name: '',
      description: ''
    };
  }

  public getTheme(): string { return this.theme; }
  public setTheme(theme: string): void { this.theme = theme; }

  getTranslateSubject() {
    return this.translateSubject.asObservable();
  }
  changeTranslateSubject(language: string) {
    this.translateDefault = language;
    this.translateSubject.next(language);
  }

}
