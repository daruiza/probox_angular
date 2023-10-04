import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public theme: string;
  public app: any;

  constructor() {
    this.theme = 'blue-grey-theme';
    this.app = {
      name: '',
      description: ''
    };
  }

  public getTheme(): string { return this.theme; }
  public setTheme(theme: string): void { this.theme = theme; }

}
