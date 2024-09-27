import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Transfer } from '../../interfaces/request';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { RequestFilterComponent } from '../../components/request-filter/request-filter.component';
import { forkJoin } from 'rxjs';
import { Allert } from '../../interfaces/allert';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import { RequestFilter } from '../../interfaces/transaction-filter';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-shop-requests',
  standalone: true,
  imports: [PropCardComponent, RequestFilterComponent, UpperCasePipe],
  templateUrl: './shop-requests.component.html',
  styleUrl: './shop-requests.component.scss',
})
export class ShopRequestsComponent implements OnInit {
  view: 'view' | 'requests' = 'requests';
  viewItem?: Transfer;
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;
  filter = signal<RequestFilter>({ date: '', store: '', destination: '' });
  requests = signal<Transfer[]>([]);
  displayed_requests = computed(() => {
    return this.shopService.filterRequests(this.requests, this.filter);
  });
  stores: Store[] = [];
  allert: Allert = {
    loading: false,
  };
  ngOnInit(): void {
    this.getResources();
  }
  filterRequests(filter: RequestFilter) {
    this.filter.set(filter);
  }

  back() {
    this.view = 'requests';
  }

  parseString(item: any) {
    return `${item}`;
  }
  getResources() {
    this.shopService.getShopReceivedRequests().subscribe((requests) => {
      this.requests.set(requests);
    });
  }
  getSN(n: number) {
    return `${n}`;
  }
  parseStore(store: Store | string) {
    return (store as Store).name;
  }
  parseProductName(product: string | Product) {
    return (product as Product).name;
  }
  parseTime(date: string | undefined) {
    // return date and time
    const d = new Date(date as string);
    return `${d.toLocaleTimeString()}  ${d.toLocaleDateString()}`;
  }
  onView(item: Transfer) {
    this.view = 'view';
    this.viewItem = item;
  }
}
