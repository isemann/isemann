import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnectComponent } from './connect/connect.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'connect',
        component: ConnectComponent,
    },
];

