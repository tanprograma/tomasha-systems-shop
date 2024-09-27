import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { RouterLink, RouterModule } from '@angular/router';
import { DropdownLinksComponent } from '../../components/dropdown-links/dropdown-links.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, DropdownLinksComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  shopService = inject(ShopService);
  storeConfig = this.shopService.storeConfig;
  storeLinks: { url: string; name: string }[] = [];
  ngOnInit(): void {
    if (this.shopService.getCurrentUser() != undefined) {
      this.configureStoreLinks();
    } else {
      this.shopService.logOut();
    }
  }
  configureStoreLinks() {
    this.shopService.getStores().subscribe((stores) => {
      this.storeLinks = stores.map((store) => {
        return { url: `/shop/${store.name}/${store._id}`, name: store.name };
      });
    });
  }
  isAdmin() {
    return (this.shopService.getCurrentUser() as User).role == 'admin';
  }
}
