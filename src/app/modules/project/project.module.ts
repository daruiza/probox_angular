import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    MatStepperModule,
    MatExpansionModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    ProjectCardComponent
  ]
})
export class ProjectModule { }
