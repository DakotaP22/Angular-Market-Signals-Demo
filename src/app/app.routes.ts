import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop/produce',
    pathMatch: 'full',
  },
  {
    path: 'shop/produce',
    loadComponent: () => import('./shop/produce/produce.component').then((m) => m.ProduceComponent),
  },
];
