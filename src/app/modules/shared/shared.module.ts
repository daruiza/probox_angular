import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


import { MatCardModule } from '@angular/material/card';


import { AlertComponent } from './alert/alert.component';
import { ErrorInputHandleComponent } from './error-input-handle/error-input-handle.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AlertComponent,
    ErrorInputHandleComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,

    MatIconModule,
    MatButtonModule,
    MatTooltipModule,

  ],
  exports: [
    NgbModule,
    CommonModule,

    MatFormFieldModule,
    MatInputModule,

    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,

    AlertComponent,
    ErrorInputHandleComponent,
    InputComponent
  ]
})
export class SharedModule { }
