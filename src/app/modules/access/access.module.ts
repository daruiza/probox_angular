import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessRoutingModule } from './access-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserService } from 'src/app/services/auth/user.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  providers: []
  
})
export class AccessModule { }
