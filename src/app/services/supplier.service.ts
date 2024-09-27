import { inject, Injectable } from '@angular/core';
import { Supplier } from '../interfaces/supplier';
import { catchError } from 'rxjs';
import { PostResponse } from '../interfaces/post-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  http = inject(HttpService);

  constructor() {}

  getSuppliers(api: string) {
    return this.http
      .get<Supplier[]>(api)
      .pipe(
        catchError(
          this.http.handleError<Supplier[]>('failed to fetch Suppliers', [])
        )
      );
  }
  postSupplier(api: string, data: Supplier) {
    return this.http
      .post<Supplier, PostResponse<Supplier>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Supplier>>(
            'could not create product',
            { status: false }
          )
        )
      );
  }
  postSuppliers(api: string, data: Supplier[]) {
    return this.http
      .post<Supplier[], PostResponse<Supplier>>(api, data)
      .pipe(
        catchError(
          this.http.handleError<PostResponse<Supplier[]>>(
            'could not create Suppliers',
            { status: false, result: [] }
          )
        )
      );
  }
}
