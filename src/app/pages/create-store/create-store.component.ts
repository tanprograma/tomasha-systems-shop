import { Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopService } from '../../services/shop.service';
@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-store.component.html',
  styleUrl: './create-store.component.scss',
})
export class CreateStoreComponent {
  plusIcon = faPlus;
  shopService = inject(ShopService);
  formBuilder = inject(FormBuilder);
  store_form = this.formBuilder.group({
    store: ['', Validators.required],
  });
  stores: Store[] = [];
  ngOnInit(): void {
    this.getStores();
  }
  getStores() {
    this.shopService.getStores().subscribe((stores) => (this.stores = stores));
  }
  createStore() {
    // console.log({ store: this.store_form.value.store ?? '' });
    this.shopService
      .postStore({ name: (this.store_form.value.store ?? '').toLowerCase() })
      .subscribe((res) => {
        if (res.status) {
          this.stores.push(res.result as Store);
        }
      });
  }
}
