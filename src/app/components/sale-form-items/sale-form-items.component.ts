import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { PropCardComponent } from '../prop-card/prop-card.component';
import { CancelButtonComponent } from '../cancel-button/cancel-button.component';

@Component({
  selector: 'sale-form-items',
  standalone: true,
  imports: [PropCardComponent, CancelButtonComponent],
  templateUrl: './sale-form-items.component.html',
  styleUrl: './sale-form-items.component.scss',
})
export class SaleFormItemsComponent {
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
  amount(item: TransactionItem) {
    return this.shopService.amount(item);
  }
}
