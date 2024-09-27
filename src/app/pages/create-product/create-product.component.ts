import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { Unit } from '../../interfaces/unit';
import { ShopService } from '../../services/shop.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  plusIcon = faPlus;
  timesIcon = faTimes;
  shopService = inject(ShopService);
  formBuilder = inject(FormBuilder);
  product_form = this.formBuilder.group({
    product: ['', Validators.required],
    category: ['', Validators.required],
  });
  unit_form = this.formBuilder.group({
    unit: ['', Validators.required],
    value: [0, Validators.required],
  });
  products: Product[] = [];
  units: Unit[] = [];
  categories: Category[] = [];
  createdUnits: { name: string; value: number }[] = [];
  ngOnInit(): void {
    this.getResources();
  }
  getResources() {
    forkJoin([
      this.shopService.getUnits(),
      this.shopService.getCategories(),
      this.shopService.getProducts(),
    ]).subscribe(([units, categories, products]) => {
      this.products = products;
      (this.units = units), (this.categories = categories);
    });
  }
  addUnit() {
    this.createdUnits.push({
      name: this.unit_form.value.unit ?? '',
      value: this.unit_form.value.value ?? 0,
    });
    this.unit_form.patchValue({
      unit: '',
      value: 0,
    });
  }
  createProduct() {
    // console.log({ Product: this.Product_form.value.Product ?? '' });
    this.shopService
      .createProduct({
        name: (this.product_form.value.product ?? '').toLowerCase(),
        category: (this.product_form.value.category ?? '').toLowerCase(),
        units: this.createdUnits,
      })
      .subscribe((res) => {
        if (res.status) {
          this.products.push(res.result as Product);
          this.product_form.patchValue({
            product: '',
          });
          this.createdUnits = [];
        }
      });
  }
}
