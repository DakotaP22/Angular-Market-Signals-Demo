import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnChanges, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from './shop.service';
import { ShopPages } from './shop.types';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { OutlinedTextFieldComponent } from '../core/material-wrappers/outlined-text-field/outlined-text-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-produce',
  standalone: true,
  imports: [CommonModule, FilterComponent, ProductCardComponent, OutlinedTextFieldComponent, ReactiveFormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  @Input({ required: true, alias: 'shop-page' }) shopPage: ShopPages;

  shopSvc = inject(ShopService);
  items = this.shopSvc.filteredItems;

  searchControl: FormControl = new FormControl('');
  search = toSignal(this.searchControl.valueChanges.pipe(debounceTime(500)), { initialValue: '' });
  logSearch = effect(() => console.log(this.search()));

  ngOnChanges() {
    this.shopSvc.loadPage(this.shopPage);
  }
}
