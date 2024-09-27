import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { PropCardComponent } from '../prop-card/prop-card.component';

@Component({
  selector: 'sales-info',
  standalone: true,
  imports: [PropCardComponent],
  templateUrl: './sales-info.component.html',
  styleUrl: './sales-info.component.scss',
})
export class SalesInfoComponent {
  @Input() items!: TransactionItem[];
  @Output() onRemove = new EventEmitter<TransactionItem>();
  shopService = inject(ShopService);

  remove(item: TransactionItem) {
    this.onRemove.emit(item);
  }
  parseString(item: any) {
    return `${item}`;
  }
  productName(item: TransactionItem) {
    return this.shopService.productName(item.product);
  }
  parseTime(date: string | undefined) {
    // return date and time
    const d = new Date(date as string);
    return `${d.toLocaleTimeString()}  ${d.toLocaleDateString()}`;
  }
  category(item: any) {
    return item.product.category as string;
  }
  amount(item: TransactionItem) {
    return this.shopService.amount(item);
  }
}
