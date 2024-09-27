import { inject, Injectable } from '@angular/core';
import { InventoryService } from './inventory.service';
import { StoreService } from './store.service';
import { HttpService } from './http.service';
import { Transfer } from '../interfaces/request';
import { catchError } from 'rxjs';
import { PostResponse } from '../interfaces/post-result';
import { TransactionItem } from '../interfaces/transaction-item';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  http = inject(HttpService);
  constructor() {}
  getRequests(api: string) {
    return this.http
      .get<Transfer[]>(api)
      .pipe(
        catchError(
          this.http.handleError<Transfer[]>('could not get requests', [])
        )
      );
  }

  postRequest(api: string, data: Transfer) {
    return this.http
      .post<Transfer, PostResponse<Transfer>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Transfer>>(
            'could not get requests',
            { status: false }
          )
        )
      );
  }
  issueRequest(api: string, data: TransactionItem[]) {
    return this.http
      .patch<TransactionItem[], PostResponse<Transfer>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Transfer>>(
            'could not get issue request',
            { status: false }
          )
        )
      );
  }
}
