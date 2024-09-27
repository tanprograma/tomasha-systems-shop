import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { DOCUMENT, UpperCasePipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LinkAnchorComponent } from '../../components/link/link.component';

@Component({
  selector: 'app-shop-statistics',
  standalone: true,
  imports: [UpperCasePipe, RouterOutlet, LinkAnchorComponent],
  templateUrl: './shop-statistics.component.html',
  styleUrl: './shop-statistics.component.scss',
})
export class ShopStatisticsComponent implements OnInit {
  shopService = inject(ShopService);
  router = inject(Router);
  document = inject(DOCUMENT);
  storeConfig = this.shopService.storeConfig;

  ngOnInit(): void {
    this.configRoutes();
  }
  configRoutes() {
    const initial_path = `/shop/${this.storeConfig().store_name}/${
      this.storeConfig().store_id
    }`;
    if (this.document.location.pathname == initial_path) {
      this.router.navigate([
        `/shop/${this.storeConfig().store_name}/${
          this.storeConfig().store_id
        }/statistics`,
      ]);
    }
  }
}
