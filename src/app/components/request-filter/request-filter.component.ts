import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RequestFilter } from '../../interfaces/transaction-filter';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'request-filter',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './request-filter.component.html',
  styleUrl: './request-filter.component.scss',
})
export class RequestFilterComponent {
  @Output() onFilter = new EventEmitter<RequestFilter>();
  filterIcon = faSearch;
  resetIcon = faRefresh;
  formBuilder = inject(FormBuilder);
  filterForm = this.formBuilder.group({
    store: [''],
    destination: [''],
    date: [''],
  });
  filter() {
    this.onFilter.emit({
      date: this.filterForm.value.date ?? '',
      store: this.filterForm.value.store ?? '',
      destination: this.filterForm.value.destination ?? '',
    });
  }
  clearFilter() {
    this.filterForm.patchValue({
      store: '',
      date: '',
      destination: '',
    });
    this.filter();
  }
}
