import { Component, computed, inject, signal } from '@angular/core';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { FilterTransactionsComponent } from '../../components/filter-transactions/filter-transactions.component';
import { Inventory } from '../../interfaces/inventory';
import { FilterStatisticsComponent } from '../../components/filter-statistics/filter-statistics.component';
import { StatisticsFilter } from '../../interfaces/transaction-filter';
import { ShopService } from '../../services/shop.service';
import { InitializingComponent } from '../../components/initializing/initializing.component';

@Component({
  selector: 'app-all-inventory',
  standalone: true,
  imports: [
    PropCardComponent,
    FilterTransactionsComponent,
    FilterStatisticsComponent,
    InitializingComponent,
  ],
  templateUrl: './all-inventory.component.html',
  styleUrl: './all-inventory.component.scss',
})
export class AllInventoryComponent {
  shopService = inject(ShopService);
  dispensed = signal<Inventory[]>([]);
  filterCriteria = signal<StatisticsFilter>({
    product: '',
    category: '',
  });
  initializing: { loading: boolean; message?: string } = { loading: false };
  displayed_data = computed(() => {
    const all = this.shopService.summarizeInventory(this.dispensed());
    const filteredProducts = this.filterProduct(all);
    return this.filterCategory(filteredProducts);
  });
  items: any;
  ngOnInit(): void {
    this.getDispensed();
  }
  getDispensed() {
    this.initializing = {
      ...this.initializing,
      loading: true,
      message: 'getting data ready',
    };
    this.shopService.getInventories().subscribe((sales) => {
      this.dispensed.set(sales);
      this.initializing.loading = false;
    });
  }
  filter(e: StatisticsFilter) {
    this.filterCriteria.set(e);
  }

  filterCategory(items: any) {
    return items.filter((item: any) => {
      if (this.filterCriteria().category == '') {
        return true;
      }
      return item.category.includes(this.filterCriteria().category);
    });
  }
  filterProduct(items: any) {
    return items.filter((item: any) => {
      if (this.filterCriteria().product == '') {
        return true;
      }
      return item.product.includes(this.filterCriteria().product);
    });
  }
  minimize(n: number) {
    return Math.floor(n);
  }
}
