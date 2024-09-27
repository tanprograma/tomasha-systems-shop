import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from '../../services/shop.service';
import { UpperCasePipe } from '@angular/common';
import { User } from '../../interfaces/user';
import { Session } from 'inspector';

@Component({
  selector: 'user',
  standalone: true,
  imports: [FontAwesomeModule, UpperCasePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userIcon = faUser;
  logoutIcon = faSignOut;
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;

  ngOnInit(): void {
    // this.user = JSON.parse(sessionStorage.getItem('user') as string);
    // console.log(this.user);
  }
  logOut() {
    this.shopService.logOut();
  }
  getUser() {
    return this.shopService.getCurrentUser();
  }
}
