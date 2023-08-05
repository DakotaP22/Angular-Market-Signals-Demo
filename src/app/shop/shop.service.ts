import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { ShopItem, ShopFilter, ShopPages } from './shop.types';
import { Observable, Subject, catchError, map, mergeMap, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';

type ShopState = {
  items: ShopItem[];
  filter: ShopFilter;
  loading: boolean;
  error?: string;
};

const initialFilter: ShopFilter = {
  minimumPrice: undefined,
  maximumPrice: undefined,
  search: null,
};

const initialState: ShopState = {
  items: [],
  filter: initialFilter,
  loading: true,
};

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  afs = inject(AngularFirestore);

  // state
  private state: WritableSignal<ShopState> = signal(initialState);

  // selectors
  items = computed(() => this.state().items);
  filter = computed(() => this.state().filter);
  filteredItems = computed(() => this.items().filter((item) => this.matchFilter(item, this.filter())));
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  // events
  newShopPage$: Subject<ShopPages> = new Subject();

  shopItemsLoaded$: Observable<{ data: ShopItem[]; error?: string }> = this.newShopPage$.pipe(
    mergeMap((page) =>
      this.afs.collection<ShopItem>('shop', (ref) => ref.where('tag', '==', page)).valueChanges({ idField: 'id' })
    ),
    map((items) => ({ data: items.map((item) => ({ ...item, unitsInCart: 0 })), error: null })),
    catchError((error) => of({ data: [], error }))
  );

  filterUpdated$ = new Subject<ShopFilter>();

  // effects

  constructor() {
    // reducers
    // on new shop page load
    this.newShopPage$.pipe(takeUntilDestroyed()).subscribe((page) => {
      this.state.update((state) => ({ ...state, loading: true }));
    });

    this.shopItemsLoaded$.pipe(takeUntilDestroyed()).subscribe((res) => {
      if (res.error) {
        this.state.update((state) => ({ ...state, items: [], error: res.error, loading: false }));
        return;
      }
      this.state.update((state) => ({ ...state, items: res.data, loading: false }));
    });

    this.filterUpdated$.pipe(takeUntilDestroyed()).subscribe((filter) => {
      this.state.update((state) => ({ ...state, filter }));
    });
  }

  loadPage(page: ShopPages) {
    this.newShopPage$.next(page);
  }

  updateFilter(filter: ShopFilter) {
    this.filterUpdated$.next(filter);
  }

  private matchFilter(item: ShopItem, filter: ShopFilter) {
    const { minimumPrice, maximumPrice, search } = filter;
    const priceMatch =
      (minimumPrice === undefined || item.price >= minimumPrice) &&
      (maximumPrice === undefined || item.price <= maximumPrice);
    const searchMatch = search === null || item.name.toLowerCase().includes(search.toLowerCase());
    return priceMatch && searchMatch;
  }
}
