import { Component, computed, inject, signal } from '@angular/core';
import { PurchaseFilterComponent } from '../../components/purchase-filter/purchase-filter.component';
import { Purchase } from '../../interfaces/purchase';
import { Allert } from '../../interfaces/allert';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import {
  PurchaseFilter,
  RequestFilter,
} from '../../interfaces/transaction-filter';
import { ShopService } from '../../services/shop.service';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-shop-purchases',
  standalone: true,
  imports: [PurchaseFilterComponent, PropCardComponent, UpperCasePipe],
  templateUrl: './shop-purchases.component.html',
  styleUrl: './shop-purchases.component.scss',
})
export class ShopPurchasesComponent {
  view: 'view' | 'requests' = 'requests';
  viewItem?: Purchase;
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;
  filter = signal<PurchaseFilter>({ date: '', supplier: '', destination: '' });
  requests = signal<Purchase[]>([]);
  displayed_requests = computed(() => {
    return this.shopService.filterPurchases(this.requests, this.filter);
  });
  stores: Store[] = [];
  allert: Allert = {
    loading: false,
  };
  ngOnInit(): void {
    this.getResources();
  }
  filterRequests(filter: PurchaseFilter) {
    this.filter.set(filter);
  }

  back() {
    this.view = 'requests';
  }

  parseString(item: any) {
    return `${item}`;
  }
  getResources() {
    this.shopService.getShopPurchases().subscribe((requests) => {
      this.requests.set(requests);
    });
  }
  getSN(n: number) {
    return `${n}`;
  }
  parseStore(store: any) {
    return store.name;
  }
  parseProductName(product: string | Product) {
    return (product as Product).name;
  }
  parseTime(date: string | undefined) {
    // return date and time
    const d = new Date(date as string);
    return `${d.toLocaleTimeString()}  ${d.toLocaleDateString()}`;
  }
  onView(item: Purchase) {
    this.view = 'view';
    this.viewItem = item;
  }
}
