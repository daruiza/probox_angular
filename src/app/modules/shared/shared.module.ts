import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { AlertComponent } from './alert/alert.component';
import { ErrorInputHandleComponent } from './error-input-handle/error-input-handle.component';

@NgModule({
  declarations: [
    AlertComponent,
    ErrorInputHandleComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    NgbModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,

    AlertComponent,
    ErrorInputHandleComponent
  ]
})
export class SharedModule { }
