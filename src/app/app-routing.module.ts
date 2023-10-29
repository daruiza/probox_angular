import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)
  },  
  {
    path: 'access',
    loadChildren: () => import('./modules/access/access.module').then(mod => mod.AccessModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
