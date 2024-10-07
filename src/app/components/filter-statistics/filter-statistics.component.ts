import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatisticsFilter } from '../../interfaces/transaction-filter';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-statistics',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './filter-statistics.component.html',
  styleUrl: './filter-statistics.component.scss',
})
export class FilterStatisticsComponent {
  @Output() onFilter = new EventEmitter<StatisticsFilter>();
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
