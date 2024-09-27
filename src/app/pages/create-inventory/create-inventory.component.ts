import { Component, inject, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { Inventory } from '../../interfaces/inventory';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEdit,
  faPlus,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../interfaces/product';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-create-inventory',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-inventory.component.html',
  styleUrl: './create-inventory.component.scss',
})
export class CreateInventoryComponent implements OnInit {
  plusIcon = faPlus;
  editIcon = faEdit;
  searchIcon = faSearch;
  view: 'all' | 'edit' = 'all';
  formBuilder = inject(FormBuilder);
  store_form = this.formBuilder.group({
    store: ['', Validators.required],
  });
  quantity_form = this.formBuilder.group({
    quantity: [0, Validators.required],
  });
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;
  stores: Store[] = [];
  inventories: Inventory[] = [];
  inventory?: Inventory;
  ngOnInit(): void {
    this.shopService.getStores().subscribe((stores) => {
      this.stores = stores;
    });
  }
  back() {
    this.view = 'all';
    this.inventory = undefined;
  }
  save() {
    if (this.inventory != undefined) {
      this.shopService
        .editInventoryPrice(this.inventory._id as string, this.inventory.prices)
        .subscribe((res) => {
          if (res.status) {
            this.inventories = this.inventories.map((inv) => {
              if (inv._id == res?.result?._id) {
                inv.prices = res.result?.prices as {
                  unit: string;
                  value: number;
                }[];
                return inv;
              }
              return inv;
            });
          }
        });
      this.inventory = undefined;
      this.view = 'all';
    }
  }
  saveInventoryQuantity() {
    const data = { quantity: this.quantity_form.value.quantity ?? 0 };
    const inventoryID = this.inventory?._id as string;
    this.shopService
      .addBegginingInventory(inventoryID, data)
      .subscribe((res) => {
        if (res.status) {
          this.inventories = this.inventories.map((inv) => {
            if (inv._id == res?.result?._id) {
              this.inventory = res.result as Inventory;
              return res.result as Inventory;
            }
            return inv;
          });
        }
      });
  }
  openEdit(inventory: Inventory) {
    this.view = 'edit';
    this.inventory = inventory;
  }
  getInventory() {
    const store = this.stores.find((store) => {
      return store.name == (this.store_form.value.store ?? '');
    }) as Store;
    this.shopService.setCurrentStore({
      store_id: store._id as string,
      store_name: store.name,
    });
    // this.shopService.storeConfig.set({
    //
    // });

    this.shopService.getShopInventories().subscribe((inventories) => {
      this.inventories = inventories;
    });
  }
  getStoreID() {
    return this.stores.find(
      (store) => store.name == (this.store_form.value.store ?? '')
    )?._id as string;
  }
  setView(view: 'all' | 'edit') {
    this.view = view;
    if (this.view == 'all') {
      this.inventory = undefined;
    }
  }
  getProductName(inventory: Inventory | undefined) {
    return (inventory?.product as Product).name;
  }
  getProductCategory(inventory: Inventory | undefined) {
    return (inventory?.product as Product).category;
  }
  changePrice(e: Event, item: any) {
    const target = e.target as HTMLInputElement;
    if (this.inventory != undefined) {
      this.inventory.prices = this.inventory.prices.map((priceItem) => {
        if (priceItem == item) {
          return { ...priceItem, value: Number(target.value) };
        }
        return priceItem;
      });
      // console.log(this.inventory);
    }
  }
}
