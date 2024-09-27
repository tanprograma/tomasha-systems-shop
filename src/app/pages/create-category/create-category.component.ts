import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../interfaces/category';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent implements OnInit {
  plusIcon = faPlus;
  shopService = inject(ShopService);
  formBuilder = inject(FormBuilder);
  category_form = this.formBuilder.group({
    category: ['', Validators.required],
  });
  categories: Category[] = [];
  ngOnInit(): void {
    this.getcategories();
  }
  getcategories() {
    this.shopService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }
  createCategory() {
    // console.log({ category: this.category_form.value.category ?? '' });
    this.shopService
      .createCategory({
        name: (this.category_form.value.category ?? '').toLowerCase(),
      })
      .subscribe((res) => {
        if (res.status) {
          this.categories.push(res.result as Category);
        }
      });
  }
}
