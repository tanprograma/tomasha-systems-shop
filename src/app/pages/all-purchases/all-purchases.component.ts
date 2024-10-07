import { Component, computed, inject, signal } from '@angular/core';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { FilterTransactionsComponent } from '../../components/filter-transactions/filter-transactions.component';
import { Sale } from '../../interfaces/sale';
import { TransactionFilter } from '../../interfaces/transaction-filter';
import { ShopService } from '../../services/shop.service';
import { Purchase } from '../../interfaces/purchase';
import { InitializingComponent } from '../../components/initializing/initializing.component';

@Component({
  selector: 'app-all-purchases',
  standalone: true,
  imports: [
    PropCardComponent,
    FilterTransactionsComponent,
    InitializingComponent,
  ],
  templateUrl: './all-purchases.component.html',
  styleUrl: './all-purchases.component.scss',
})
export class AllPurchasesComponent {
  shopService = inject(ShopService);
  dispensed = signal<Purchase[]>([]);
  filterCriteria = signal<TransactionFilter>({
    product: '',
    category: '',
    date: '',
  });
  displayed_data = computed(() => {
    const dispensedOnDate = this.filterDate();
    const dispensedCategory = this.filterCategory(
      this.shopService.summarizePurchased(dispensedOnDate)
    );
    return this.filterProduct(dispensedCategory);
  });
  items: any;
  initializing: { loading: boolean; message?: string } = {
    loading: true,
    message: 'getting purchases data ready',
  };
  ngOnInit(): void {
    this.getDispensed();
  }
  getDispensed() {
    this.shopService.getPurchases().subscribe((sales) => {
      this.dispensed.set(sales);
      this.initializing.loading = false;
    });
  }
  filter(e: TransactionFilter) {
    this.filterCriteria.set(e);
  }
  filterDate() {
    return this.dispensed().filter((d) => {
      if (this.filterCriteria().date == '') {
        return true;
      }
      return (
        new Date(d.createdAt as string).toLocaleDateString() ==
        new Date(this.filterCriteria().date).toLocaleDateString()
      );
    });
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
}
