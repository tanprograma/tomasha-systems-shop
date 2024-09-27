import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TransactionItem } from '../../interfaces/transaction-item';
import { ShopService } from '../../services/shop.service';
import { PropCardComponent } from '../prop-card/prop-card.component';
import { CancelButtonComponent } from '../cancel-button/cancel-button.component';

@Component({
  selector: 'request-form-items',
  standalone: true,
  imports: [PropCardComponent, CancelButtonComponent],
  templateUrl: './request-form-items.component.html',
  styleUrl: './request-form-items.component.scss',
})
export class RequestFormItemsComponent {
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
}
