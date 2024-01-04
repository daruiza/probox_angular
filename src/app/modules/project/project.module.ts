import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
  ],
  exports: [
    ProjectCardComponent
  ]
})
export class ProjectModule { }
