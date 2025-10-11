import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnectComponent } from './connect/connect.component';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)},
    {path: 'home', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)},
    {
        path: 'connect',
        component: ConnectComponent,
    },
    {path: '**', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)},
    
];

