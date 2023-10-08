import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';


import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    SharedModule, 
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [ToolbarComponent]
})
export class HeaderModule { }
