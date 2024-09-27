import { Component, inject } from '@angular/core';
import { Supplier } from '../../interfaces/supplier';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from '../../services/shop.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestAllertComponent } from '../../components/request-allert/request-allert.component';
import { Allert } from '../../interfaces/allert';
@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RequestAllertComponent],
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.scss',
})
export class CreateSupplierComponent {
  plusIcon = faPlus;
  shopService = inject(ShopService);
  formBuilder = inject(FormBuilder);
  supplier_form = this.formBuilder.group({
    supplier: ['', Validators.required],
  });
  suppliers: Supplier[] = [];
  allert: Allert = {
    loading: false,
  };
  ngOnInit(): void {
    this.getSuppliers();
  }
  handleAllert(event: boolean) {
    this.allert = {
      ...this.allert,
      loading: false,
      message: undefined,
      status: undefined,
    };
  }
  getSuppliers() {
    this.shopService
      .getSuppliers()
      .subscribe((suppliers) => (this.suppliers = suppliers));
  }
  createSupplier() {
    // console.log({ store: this.store_form.value.store ?? '' });
    this.allert.loading = true;
    this.shopService
      .postSupplier({
        name: (this.supplier_form.value.supplier ?? '').toLowerCase(),
      })
      .subscribe((res) => {
        if (res.status) {
          this.suppliers.push(res.result as Supplier);
          this.allert.status = true;
          this.allert.message = 'created supplier successfully';
          return;
        }
        this.allert.status = false;
        this.allert.message = 'could not create supplier. try again';
      });
  }
}
