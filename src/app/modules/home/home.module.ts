import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule} from '../shared/shared.module';
import { ProjectComponent } from './project/project.component'

@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    
  ]
})
export class HomeModule { }
