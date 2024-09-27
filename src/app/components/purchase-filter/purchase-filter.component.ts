import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PurchaseFilter } from '../../interfaces/transaction-filter';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'purchase-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './purchase-filter.component.html',
  styleUrl: './purchase-filter.component.scss',
})
export class PurchaseFilterComponent {
  @Output() onFilter = new EventEmitter<PurchaseFilter>();
  filterIcon = faSearch;
  resetIcon = faRefresh;
  formBuilder = inject(FormBuilder);
  filterForm = this.formBuilder.group({
    supplier: [''],
    destination: [''],
    date: [''],
  });
  filter() {
    this.onFilter.emit({
      date: this.filterForm.value.date ?? '',
      supplier: this.filterForm.value.supplier ?? '',
      destination: this.filterForm.value.destination ?? '',
    });
  }
  clearFilter() {
    this.filterForm.patchValue({
      supplier: '',
      date: '',
      destination: '',
    });
    this.filter();
  }
}
