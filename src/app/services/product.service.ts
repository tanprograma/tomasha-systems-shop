import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { catchError, forkJoin } from 'rxjs';
import { PostResponse } from '../interfaces/post-result';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { CategoryService } from './category.service';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = inject(UrlService).PRODUCT_API;
  categoryService = inject(CategoryService);
  unitService = inject(UnitService);
  http = inject(HttpService);
  constructor() {}
  getProducts(api: string) {
    return this.http
      .get<Product[]>(api)
      .pipe(
        catchError(
          this.http.handleError<Product[]>('could not get Products', [])
        )
      );
  }

  postProduct(api: string, data: Product) {
    return this.http.post<Product, PostResponse<Product>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<Product>>(
          'could not create Product',
          {
            status: false,
          }
        )
      )
    );
  }
  postProducts(api: string, data: Product[]) {
    return this.http.post<Product[], PostResponse<Product[]>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<Product[]>>(
          'could not create Products',
          {
            result: [],
            status: false,
          }
        )
      )
    );
  }
}
