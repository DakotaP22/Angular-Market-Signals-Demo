import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from './shop.service';
import { ShopPages } from './shop.types';
import { FilterComponent } from './components/filter/filter.component';

@Component({
  selector: 'app-produce',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShopComponent {
  @Input({ required: true, alias: 'shop-page' }) shopPage: ShopPages;

  shopSvc = inject(ShopService);

  ngOnChanges() {
    this.shopSvc.loadPage(this.shopPage);
  }
}
