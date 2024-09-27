import { inject, Injectable } from '@angular/core';
import { Purchase } from '../interfaces/purchase';
import { catchError } from 'rxjs';
import { PostResponse } from '../interfaces/post-result';
import { TransactionItem } from '../interfaces/transaction-item';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  http = inject(HttpService);
  constructor() {}
  getPurchases(api: string) {
    return this.http
      .get<Purchase[]>(api)
      .pipe(
        catchError(
          this.http.handleError<Purchase[]>('could not get Purchases', [])
        )
      );
  }

  postPurchase(api: string, data: Purchase) {
    return this.http
      .post<Purchase, PostResponse<Purchase>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Purchase>>(
            'could not get Purchases',
            { status: false }
          )
        )
      );
  }
  receivePurchase(api: string, data: TransactionItem[]) {
    return this.http
      .patch<TransactionItem[], PostResponse<Purchase>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Purchase>>(
            'could not get receive Purchase',
            { status: false }
          )
        )
      );
  }
}
