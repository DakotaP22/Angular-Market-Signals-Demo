import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from './shop.service';
import { ShopPages } from './shop.types';

@Component({
  selector: 'app-produce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  @Input({ required: true, alias: 'shop-page' }) shopPage: ShopPages;

  shopSvc = inject(ShopService);
  items = this.shopSvc.filteredItems;
  loading = this.shopSvc.loading;

  ngOnChanges() {
    this.shopSvc.loadPage(this.shopPage);
  }
}
