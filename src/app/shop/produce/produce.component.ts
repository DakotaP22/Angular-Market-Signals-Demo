import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../shop.service';
import { ShopPages } from '../shop.types';

@Component({
  selector: 'app-produce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produce.component.html',
  styleUrls: ['./produce.component.scss'],
})
export class ProduceComponent {
  shopSvc = inject(ShopService);
  items = this.shopSvc.filteredItems;
  loading = this.shopSvc.loading;

  ngOnInit() {
    this.shopSvc.loadPage(ShopPages.PRODUCE);
  }
}
