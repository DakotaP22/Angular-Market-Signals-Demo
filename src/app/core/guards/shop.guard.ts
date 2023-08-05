import { CanMatchFn } from '@angular/router';
import { ShopPages } from '../../shop/shop.types';

export const shopGuard: CanMatchFn = (route, segments) => {
  const shopPage = segments[1].path as ShopPages;
  return Object.values(ShopPages).includes(shopPage);
};
