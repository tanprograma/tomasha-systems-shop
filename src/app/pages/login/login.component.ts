import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  shopService = inject(ShopService);

  formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  login() {
    const user: User = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.shopService.login(user).subscribe((res) => {
      if (res.status) {
        const user = res.result as User;
        this.shopService.setCurrentUser(user);
        this.shopService.router.navigate(['/home']);
      }
    });
  }
}
