import { DOCUMENT, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { Inventory } from '../../interfaces/inventory';
import { Product } from '../../interfaces/product';
import { Transfer } from '../../interfaces/request';
import { Store } from '../../interfaces/store';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { Allert } from '../../interfaces/allert';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestAllertComponent } from '../../components/request-allert/request-allert.component';
import { RequestFormItemsComponent } from '../../components/request-form-items/request-form-items.component';

@Component({
  selector: 'shop-create-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    RequestAllertComponent,
    RequestFormItemsComponent,
    UpperCasePipe,
  ],
  templateUrl: './shop-create-request.component.html',
  styleUrl: './shop-create-request.component.scss',
})
export class ShopCreateRequestComponent {
  inventories: Inventory[] = [];
  stores: Store[] = [];
  plusIcon = faPlus;
  document = inject(DOCUMENT);
  formBuilder = inject(FormBuilder);
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;
  item_form = this.formBuilder.group({
    product: ['', Validators.required],
    store: ['', Validators.required],
    unit: ['', Validators.required],
    quantity: [0, Validators.required],
  });
  items: TransactionItem[] = [];
  allert: Allert = {
    loading: false,
  };

  units: { name: string; value: number }[] = [];
  ngOnInit(): void {
    this.getResources();
  }
  getResources() {
    this.allert = {
      ...this.allert,
      loading: true,
      message: 'fetching resources',
    };
    forkJoin([
      this.shopService.getStores(),
      this.shopService.getShopInventories(),
    ]).subscribe(([stores, inventories]) => {
      this.inventories = inventories;
      this.stores = stores;
      this.allert.loading = false;
    });
  }
  handleAllert(event: boolean) {
    this.allert = {
      ...this.allert,
      loading: false,
      message: undefined,
      status: undefined,
    };
  }
  createRequest() {
    this.allert.loading = true;

    this.shopService.createRequest(this.createPayload()).subscribe((res) => {
      if (res.status) {
        this.items = [];
        this.allert.status = true;
        this.allert.message = 'successfully created the purchase request';
      } else {
        this.allert.status = false;
        this.allert.message =
          'could not create the purchase request. send again';
      }
    });
  }
  private createPayload(): Transfer {
    return {
      store: this.getStoreID(this.item_form.value.store ?? '') as string,
      destination: this.storeConfig().store_id,
      products: this.items.map((item) => ({
        ...item,
        product: (item.product as Product)._id as string,
      })),
      completed: false,
    };
  }
  getStoreID(name: string) {
    return this.stores.find((item) => item.name == name)?._id;
  }
  addItem() {
    this.items.push({
      product: this.getProduct() as Product,
      unit: this.item_form.value.unit ?? '',
      price: this.getPrice(),
      unit_value: this.getUnitValue(),
      quantity: this.item_form.value.quantity ?? 0,
      received: 0,
    });
    this.clearForm();
  }
  remove(item: TransactionItem) {
    this.items = this.items.filter((p) => p != item);
  }
  clearForm() {
    this.item_form.patchValue({
      product: '',
      quantity: 0,
      unit: '',
    });
    this.units = [];
  }
  getUnits() {
    const product = this.getProduct();
    if (product != undefined) {
      this.units = product.units;
    }
  }
  private getProduct() {
    return this.getProductFromInventories(this.item_form.value.product ?? '');
  }
  private getProductFromInventories(productName: string) {
    return this.inventories.find(
      (item) => (item.product as Product).name == productName
    )?.product as Product | undefined;
  }
  productName(product: Product | string) {
    return this.parseProductName(product);
  }

  private parseProductName(product: Product | string) {
    return (product as Product).name;
  }
  getPrice() {
    // get price of item in form
    const product = this.item_form.value.product ?? '';
    const unit = this.item_form.value.unit ?? '';
    const inventory = this.getInventoryByProductName(product);
    if (inventory != undefined) {
      return inventory.prices.find((item) => {
        return item.unit == unit;
      })?.value as number;
    }
    return 1;
  }
  private getInventoryByProductName(productName: string) {
    return this.inventories.find((item) => {
      return (item.product as Product).name == productName;
    });
  }
  getUnitValue() {
    //  get unit value

    const unit = this.item_form.value.unit ?? '';
    const product = this.getProduct();
    if (product != undefined) {
      return product.units.find((u) => {
        return u.name == unit;
      })?.value as number;
    }
    return 1;
  }
}
