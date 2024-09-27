import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { InventoryListComponent } from '../../components/inventory-list/inventory-list.component';
import { ShopService } from '../../services/shop.service';
import { Inventory } from '../../interfaces/inventory';
import { InventoryFilter } from '../../interfaces/inventory-filter';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-shop-inventories',
  standalone: true,
  imports: [InventoryListComponent, UpperCasePipe],
  templateUrl: './shop-inventories.component.html',
  styleUrl: './shop-inventories.component.scss',
})
export class ShopInventoriesComponent implements OnInit {
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;
  inventories = signal<Inventory[]>([]);
  displayed_inventories = computed(() => {
    return this.shopService.filterInventories(this.inventories(), this.filter);
  });
  filter = signal<InventoryFilter>({ product: '', category: '' });
  filterInventories(item: InventoryFilter) {
    this.filter.set(item);
  }
  ngOnInit(): void {
    this.getInventories();
  }
  getInventories() {
    this.shopService.getShopInventories().subscribe((inventories) => {
      this.inventories.set(inventories);
    });
  }
}
