import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { catchError } from 'rxjs';
import { PostResponse } from '../interfaces/post-result';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  api = inject(UrlService).CATEGORY_API;

  http = inject(HttpService);
  constructor() {}
  getCategories(api: string) {
    return this.http
      .get<Category[]>(api)
      .pipe(catchError(this.http.handleError('could not get Categories', [])));
  }
  postCategory(api: string, data: Category) {
    return this.http.post<Category, PostResponse<Category>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<Category>>(
          'could not create Category',
          {
            status: false,
          }
        )
      )
    );
  }
  postCategories(api: string, data: Category[]) {
    return this.http.post<Category[], PostResponse<Category[]>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<Category[]>>(
          'could not create Categories',
          {
            result: [],
            status: false,
          }
        )
      )
    );
  }
}
