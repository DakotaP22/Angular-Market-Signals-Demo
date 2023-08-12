import { Pipe, PipeTransform } from '@angular/core';
import { ShopItem } from '../shop.types';

@Pipe({
  name: 'pricePerUnit',
  standalone: true,
})
export class PricePerUnitPipe implements PipeTransform {
  transform(shopItem: ShopItem): string {
    return `$${shopItem.price}/${shopItem.unit}`;
  }
}
