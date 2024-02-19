import { Routes } from "@angular/router";

export const routes: Routes = [

    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', redirectTo: '/home' }
]