import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { ProjectDocumentComponent } from './project-document/project-document.component';
import { ProjectCustomerComponent } from './project-customer/project-customer.component';
import { ProjectColaboratorComponent } from './project-colaborator/project-colaborator.component';
import { ProjectNoteComponent } from './project-note/project-note.component';

import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ProjectCardComponent,
    ProjectTaskComponent,
    ProjectDocumentComponent,
    ProjectCustomerComponent,
    ProjectColaboratorComponent,
    ProjectNoteComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatExpansionModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    ProjectCardComponent
  ]  
})
export class ProjectModule { }
