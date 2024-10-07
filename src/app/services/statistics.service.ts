import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Sale } from '../interfaces/sale';
import { TransactionItem } from '../interfaces/transaction-item';
import { Product } from '../interfaces/product';
import { Purchase } from '../interfaces/purchase';
import { Inventory } from '../interfaces/inventory';
import { StatisticsSummary } from '../interfaces/statistics-summary';
import { Statistics } from '../interfaces/statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor() {}

  getDispensedSummary(sales: Sale[]) {
    const statistics = sales.reduce((cum, curr) => {
      for (let item of curr.products) {
        const product = item.product as Product;
        if (cum[product.name] == undefined) {
          cum[product.name] = {
            product: product.name,
            unit: this.getLargestUnit(product).name,
            unit_value: this.getLargestUnit(product).value,
            quantity: item.quantity * item.unit_value,
            category: product.category,
            amount: (item.price as number) * item.quantity,
          };
        } else {
          cum[product.name].quantity += item.quantity * item.unit_value;
          (cum[product.name].amount as number) +=
            (item.price as number) * item.quantity;
        }
      }
      return cum;
    }, new Statistics());
    return Object.values(statistics);
  }
  getPurchaseSummary(sales: Purchase[]) {
    const statistics = sales.reduce((cum, curr) => {
      for (let item of curr.products) {
        const product = item.product as Product;
        if (cum[product.name] == undefined) {
          cum[product.name] = {
            product: product.name,
            unit: this.getLargestUnit(product).name,
            unit_value: this.getLargestUnit(product).value,
            quantity: item.quantity * item.unit_value,
            category: product.category,
            amount: (item.price as number) * item.quantity,
          };
        } else {
          cum[product.name].quantity += item.quantity * item.unit_value;
          (cum[product.name].amount as number) +=
            (item.price as number) * item.quantity;
        }
      }
      return cum;
    }, new Statistics());
    return Object.values(statistics);
  }
  getInventorySummary(sales: Inventory[]) {
    const statistics = sales.reduce((cum, curr) => {
      const product = curr.product as Product;
      if (cum[product.name] == undefined) {
        cum[product.name] = {
          product: product.name,
          unit: this.getLargestUnit(product).name,
          unit_value: this.getLargestUnit(product).value,
          quantity: curr.quantity,
          category: product.category,
        };
      } else {
        cum[product.name].quantity += curr.quantity;
      }

      return cum;
    }, new Statistics());
    return Object.values(statistics);
  }
  getLargestUnit(product: Product) {
    return product.units.sort((a, b) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    })[0];
  }
}
