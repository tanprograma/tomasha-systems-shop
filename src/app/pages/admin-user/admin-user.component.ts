import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestAllertComponent } from '../../components/request-allert/request-allert.component';
import { Allert } from '../../interfaces/allert';
import { User } from '../../interfaces/user';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [ReactiveFormsModule, RequestAllertComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss',
})
export class AdminUserComponent {
  shopService = inject(ShopService);
  allert: Allert = {
    loading: false,
  };
  formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    role: ['', Validators.required],
  });
  createUser() {
    this.allert.loading = true;
    const user: User = {
      firstname: this.userForm.value.firstname ?? '',
      lastname: this.userForm.value.lastname ?? '',
      email: this.userForm.value.email ?? '',
      password: 'user',
      role: (this.userForm.value.role ?? '') as 'admin' | 'other',
    };
    console.log(user);

    this.shopService.createUser(user).subscribe((res) => {
      if (res.status) {
        this.allert.status = true;
        this.allert.message = 'created user successfully';
        this.clearForm();
      } else {
        this.allert.status = false;
        this.allert.message = 'could not create user';
      }
    });
  }
  clearForm() {
    this.userForm.patchValue({
      firstname: '',
      lastname: '',
      role: '',
      email: '',
    });
  }
  handleAllert(event: any) {
    this.allert.loading = false;
    this.allert.status = undefined;
  }
}
