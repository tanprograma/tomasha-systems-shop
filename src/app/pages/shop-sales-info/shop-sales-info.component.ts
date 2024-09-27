import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Sale } from '../../interfaces/sale';
import { SalesInfoComponent } from '../../components/sales-info/sales-info.component';
import { ShopService } from '../../services/shop.service';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TransactionItem } from '../../interfaces/transaction-item';
import { Product } from '../../interfaces/product';
import { FilterTransactionsComponent } from '../../components/filter-transactions/filter-transactions.component';
import { TransactionFilter } from '../../interfaces/transaction-filter';
import { PropCardComponent } from '../../components/prop-card/prop-card.component';

@Component({
  selector: 'app-shop-sales-info',
  standalone: true,
  imports: [
    SalesInfoComponent,
    UpperCasePipe,
    ReactiveFormsModule,
    FilterTransactionsComponent,
    PropCardComponent,
  ],
  templateUrl: './shop-sales-info.component.html',
  styleUrl: './shop-sales-info.component.scss',
})
export class ShopSalesInfoComponent implements OnInit {
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;

  filterCriteria = signal<{
    category: string;
    product: string;
    date: string;
  }>({
    product: '',
    category: '',
    date: '',
  });
  amount = computed(() => {
    return this.displayed_sales().reduce((cum, curr) => {
      const amount = (curr.price as number) * curr.quantity;
      return (cum += amount);
    }, 0);
  });
  discount = computed(() => {
    // console.log(this.displayed_sales());
    return this.displayed_sales().reduce((cum, curr) => {
      const discount = curr.discount as number;

      return (cum += discount);
    }, 0);
  });

  displayed_sales = computed(() => {
    return this.shopService.filterSalesTransactions(
      this.sales,
      this.filterCriteria
    );
  });

  sales = signal<Sale[]>([]);
  ngOnInit(): void {
    // if (this.shopService.isSession()) {
    //   this.getSales();
    // } else {
    //   this.shopService.logOut();
    // }

    this.getSales();
  }
  filter(item: TransactionFilter) {
    this.filterCriteria.update((v) => ({
      ...v,
      category: item.category,
      product: item.product,
      date: item.date,
    }));
  }
  // isSaleDate(date_1: string, date_2: string) {
  //   return date_1 == date_2;
  // }

  getDateString(date: string) {
    try {
      return new Date(date).toLocaleDateString();
    } catch (error) {
      return '';
    }
  }

  getSales() {
    this.shopService.getShopSales().subscribe((sales) => {
      this.sales.set(sales);
    });
  }
}
