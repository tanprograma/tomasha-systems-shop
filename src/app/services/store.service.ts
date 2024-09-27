import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Store } from '../interfaces/store';
import { catchError } from 'rxjs';

import { PostResponse } from '../interfaces/post-result';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  http = inject(HttpService);

  constructor() {}

  getStores(api: string) {
    return this.http
      .get<Store[]>(api)
      .pipe(
        catchError(this.http.handleError<Store[]>('failed to fetch stores', []))
      );
  }
  postStore(api: string, data: Store) {
    return this.http
      .post<Store, PostResponse<Store>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Store>>(
            'could not create product',
            { status: false }
          )
        )
      );
  }
  postStores(api: string, data: Store[]) {
    return this.http
      .post<Store[], PostResponse<Store>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Store[]>>(
            'could not create stores',
            { status: false, result: [] }
          )
        )
      );
  }
}
