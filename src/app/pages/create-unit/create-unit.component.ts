import { Component, inject, OnInit } from '@angular/core';
import { Unit } from '../../interfaces/unit';
import { ShopService } from '../../services/shop.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-create-unit',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-unit.component.html',
  styleUrl: './create-unit.component.scss',
})
export class CreateUnitComponent implements OnInit {
  plusIcon = faPlus;
  shopService = inject(ShopService);
  formBuilder = inject(FormBuilder);
  unit_form = this.formBuilder.group({
    unit: ['', Validators.required],
  });
  units: Unit[] = [];
  ngOnInit(): void {
    this.getUnits();
  }
  getUnits() {
    this.shopService.getUnits().subscribe((units) => (this.units = units));
  }
  createUnit() {
    // console.log({ unit: this.unit_form.value.unit ?? '' });
    this.shopService
      .createUnit({ name: (this.unit_form.value.unit ?? '').toLowerCase() })
      .subscribe((res) => {
        if (res.status) {
          this.units.push(res.result as Unit);
        }
      });
  }
}
