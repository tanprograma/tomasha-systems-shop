import { Component, computed, inject, signal } from '@angular/core';
import { Purchase } from '../../interfaces/purchase';
import { Supplier } from '../../interfaces/supplier';
import { Allert } from '../../interfaces/allert';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import {
  PurchaseFilter,
  RequestFilter,
} from '../../interfaces/transaction-filter';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { PurchaseFilterComponent } from '../../components/purchase-filter/purchase-filter.component';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { RequestAllertComponent } from '../../components/request-allert/request-allert.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-shop-receive-purchase',
  standalone: true,
  imports: [
    PurchaseFilterComponent,
    PropCardComponent,
    RequestAllertComponent,
    UpperCasePipe,
  ],
  templateUrl: './shop-receive-purchase.component.html',
  styleUrl: './shop-receive-purchase.component.scss',
})
export class ShopReceivePurchaseComponent {
  view: 'requests' | 'issue' = 'requests';
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
  issue() {
    const purchaseID = (this.viewItem as Purchase)._id as string;
    const data = (this.viewItem as Purchase).products.map((item) => {
      return { ...item, product: (item.product as Product)._id as string };
    });

    this.allert = { ...this.allert, loading: true, message: 'issuing items' };
    this.shopService.receivePurchase(purchaseID, data).subscribe((res) => {
      if (res.status) {
        this.allert.status = true;
        this.allert.message = 'issue successful';
        this.requests.update((v) =>
          v.map((item) => {
            if (item._id == purchaseID) {
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
    this.shopService.getShopPurchases().subscribe((requests) => {
      console.log({ requests });
      this.requests.set(requests);
    });
  }
  getSN(n: number) {
    return `${n}`;
  }
  getStoreFromID(store: Store | string) {
    return (store as Store).name;
  }
  getSupplierFromID(store: Supplier | string) {
    return (store as Supplier).name;
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
    this.view = 'issue';
    this.viewItem = item;
  }
}
