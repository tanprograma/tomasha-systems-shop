import { Component, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Allert } from '../../interfaces/allert';
import { Product } from '../../interfaces/product';
import { Transfer } from '../../interfaces/request';
import { Store } from '../../interfaces/store';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { RequestAllertComponent } from '../../components/request-allert/request-allert.component';
import { UpperCasePipe } from '@angular/common';
import { RequestFilterComponent } from '../../components/request-filter/request-filter.component';
import { RequestFilter } from '../../interfaces/transaction-filter';

@Component({
  selector: 'shop-issue-request',
  standalone: true,
  imports: [
    PropCardComponent,
    RequestAllertComponent,
    UpperCasePipe,
    RequestFilterComponent,
  ],
  templateUrl: './shop-issue-request.component.html',
  styleUrl: './shop-issue-request.component.scss',
})
export class ShopIssueRequestComponent {
  view: 'requests' | 'issue' = 'requests';
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
  issue() {
    const inventoryID = (this.viewItem as Transfer)._id as string;
    const data = (this.viewItem as Transfer).products.map((item) => {
      return { ...item, product: (item.product as Product)._id as string };
    });

    this.allert = { ...this.allert, loading: true, message: 'issuing items' };
    this.shopService.issueRequest(inventoryID, data).subscribe((res) => {
      if (res.status) {
        this.allert.status = true;
        this.allert.message = 'issue successful';
        this.requests.update((v) =>
          v.map((item) => {
            if (item._id == inventoryID) {
              item.completed = true;
              return item;
            }
            return item;
          })
        );
        this.view = 'requests';
      } else {
        this.allert.status = false;
        this.allert.message = 'issue failed. try again';
      }
    });
  }
  back() {
    this.view = 'requests';
  }
  handleAllert(event: boolean) {
    this.allert.loading = false;
  }
  setReceived(event: Event, item: TransactionItem) {
    const target = event.target as HTMLInputElement;
    if (this.viewItem != undefined) {
      this.viewItem.products = this.viewItem.products.map((productItem) => {
        if (item == productItem)
          return { ...productItem, received: Number(target.value) };
        return productItem;
      });
    }
  }
  parseString(item: any) {
    return `${item}`;
  }
  getResources() {
    forkJoin([
      this.shopService.getStores(),
      this.shopService.getShopIssuedRequests(),
    ]).subscribe(([stores, requests]) => {
      this.stores = stores;
      this.requests.set(requests);
    });
  }
  getSN(n: number) {
    return `${n}`;
  }
  getStoreFromID(store: Store | string) {
    return this.stores.find((item) => {
      return item._id == (store as Store)._id;
    })?.name as string;
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
    this.view = 'issue';
    this.viewItem = item;
  }
}
