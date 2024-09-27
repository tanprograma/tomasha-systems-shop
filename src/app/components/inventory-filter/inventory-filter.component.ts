import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InventoryFilter } from '../../interfaces/inventory-filter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'inventory-filter',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './inventory-filter.component.html',
  styleUrl: './inventory-filter.component.scss',
})
export class InventoryFilterComponent {
  @Output() onFilter = new EventEmitter<InventoryFilter>();
  filterIcon = faSearch;
  resetIcon = faRefresh;
  formBuilder = inject(FormBuilder);
  filterForm = this.formBuilder.group({
    product: [''],
    category: [''],
  });
  filter() {
    this.onFilter.emit({
      product: this.filterForm.value.product ?? '',
      category: this.filterForm.value.category ?? '',
    });
  }
  clearFilter() {
    this.filterForm.patchValue({
      product: '',

      category: '',
    });
    this.filter();
  }
}
