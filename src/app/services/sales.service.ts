import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Sale } from '../interfaces/sale';
import { PostResponse } from '../interfaces/post-result';
import { InventoryService } from './inventory.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  http = inject(HttpService);

  constructor() {}

  getSales(api: string) {
    return this.http.get<Sale[]>(api);
  }

  postSale(api: string, data: Sale) {
    return this.http.post<Sale, PostResponse<Sale>>(api, data);
  }
  postSales(api: string, data: Sale[]) {
    return this.http.post<Sale[], PostResponse<Sale[]>>(api, data);
  }
}
