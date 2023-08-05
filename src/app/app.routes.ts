import { Routes } from '@angular/router';
import { shopGuard } from './core/guards/shop.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop/produce',
    pathMatch: 'full',
  },
  {
    path: 'shop/:shop-page',
    loadComponent: () => import('./shop/shop.component').then((m) => m.ShopComponent),
    canMatch: [shopGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
  },
];
