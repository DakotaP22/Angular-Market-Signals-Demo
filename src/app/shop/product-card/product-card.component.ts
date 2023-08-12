import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from '../shop.types';
import { PricePerUnitPipe } from './product-card.pipe';

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [CommonModule, PricePerUnitPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponent {
  @Input({ required: true, alias: 'shop-item' }) shopItem: ShopItem;
}
