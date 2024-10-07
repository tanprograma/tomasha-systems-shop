import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FilterStatisticsComponent } from '../../components/filter-statistics/filter-statistics.component';
import { Sale } from '../../interfaces/sale';
import { ShopService } from '../../services/shop.service';
import { FilterTransactionsComponent } from '../../components/filter-transactions/filter-transactions.component';
import { TransactionFilter } from '../../interfaces/transaction-filter';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';
import { InitializingComponent } from '../../components/initializing/initializing.component';

@Component({
  selector: 'app-all-dispensed',
  standalone: true,
  imports: [
    FilterStatisticsComponent,
    FilterTransactionsComponent,
    PropCardComponent,
    InitializingComponent,
  ],
  templateUrl: './all-dispensed.component.html',
  styleUrl: './all-dispensed.component.scss',
})
export class AllDispensedComponent implements OnInit {
  shopService = inject(ShopService);
  dispensed = signal<Sale[]>([]);
  filterCriteria = signal<TransactionFilter>({
    product: '',
    category: '',
    date: '',
  });
  displayed_data = computed(() => {
    const dispensedOnDate = this.filterDate();
    const dispensedCategory = this.filterCategory(
      this.shopService.summarizeDispensed(dispensedOnDate)
    );
    return this.filterProduct(dispensedCategory);
  });
  items: any;
  initializing: { loading: boolean; message?: string } = {
    loading: true,
    message: 'getting dispensed data ready',
  };
  ngOnInit(): void {
    this.getDispensed();
  }
  getDispensed() {
    this.shopService.getSales().subscribe((sales) => {
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
  ceiling(n: number) {
    return Math.ceil(n);
  }
}
