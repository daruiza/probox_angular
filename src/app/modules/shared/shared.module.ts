import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


import { MatCardModule } from '@angular/material/card';


import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SelectComponent } from './select/select.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalMapComponent } from './modal-map/modal-map.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AlertComponent,
    InputComponent,
    SelectComponent,
    ModalMapComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    NgSelectModule,

    GoogleMapsModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatIconModule,
    MatButtonModule,
    MatTooltipModule,

  ],
  exports: [
    NgbModule,
    CommonModule,
    TranslateModule,

    NgSelectModule,

    GoogleMapsModule,


    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,

    AlertComponent,
    InputComponent,
    SelectComponent
  ],
  providers: []
})
export class SharedModule { }
