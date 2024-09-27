import { Inject, inject, Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { Unit } from '../interfaces/unit';
import { catchError } from 'rxjs';

import { PostResponse } from '../interfaces/post-result';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  http = inject(HttpService);
  constructor() {}
  getUnits(api: string) {
    return this.http
      .get<Unit[]>(api)
      .pipe(
        catchError(this.http.handleError<Unit[]>('could not get units', []))
      );
  }
  postUnit(api: string, data: Unit) {
    return this.http.post<Unit, PostResponse<Unit>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<Unit>>('could not create unit', {
          status: false,
        })
      )
    );
  }
  postUnits(api: string, data: Unit[]) {
    return this.http.post<Unit[], PostResponse<Unit[]>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<Unit[]>>('could not create units', {
          result: [],
          status: false,
        })
      )
    );
  }
}
