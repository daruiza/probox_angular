import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    component: WelcomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
