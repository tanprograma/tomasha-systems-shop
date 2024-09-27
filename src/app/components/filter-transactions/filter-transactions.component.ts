import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFilter,
  faRefresh,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionFilter } from '../../interfaces/transaction-filter';

@Component({
  selector: 'filter-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './filter-transactions.component.html',
  styleUrl: './filter-transactions.component.scss',
})
export class FilterTransactionsComponent {
  @Output() onFilter = new EventEmitter<TransactionFilter>();
  filterIcon = faSearch;
  resetIcon = faRefresh;
  formBuilder = inject(FormBuilder);
  filterForm = this.formBuilder.group({
    product: [''],
    category: [''],
    date: [''],
  });
  filter() {
    this.onFilter.emit({
      date: this.filterForm.value.date ?? '',
      product: this.filterForm.value.product ?? '',
      category: this.filterForm.value.category ?? '',
    });
  }
  clearFilter() {
    this.filterForm.patchValue({
      product: '',
      date: '',
      category: '',
    });
    this.filter();
  }
}
