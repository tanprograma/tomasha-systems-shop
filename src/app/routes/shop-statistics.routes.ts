import { Routes } from '@angular/router';
import { ShopPurchasesComponent } from '../pages/shop-purchases/shop-purchases.component';
import { ShopRequestsComponent } from '../pages/shop-requests/shop-requests.component';
import { ShopSalesInfoComponent } from '../pages/shop-sales-info/shop-sales-info.component';
import { ShopInventoriesComponent } from '../pages/shop-inventories/shop-inventories.component';

export const routes: Routes = [
  { path: '', component: ShopSalesInfoComponent },
  { path: 'requests', component: ShopRequestsComponent },
  { path: 'purchases', component: ShopPurchasesComponent },
  { path: 'inventories', component: ShopInventoriesComponent },
];
