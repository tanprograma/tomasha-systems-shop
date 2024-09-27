import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpService } from './http.service';
import { PostResponse } from '../interfaces/post-result';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpService);
  constructor() {}
  login(api: string, data: User) {
    return this.http.post<User, PostResponse<User>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<User>>('could not login user', {
          status: false,
        })
      )
    );
  }
  createUser(api: string, data: User) {
    return this.http.post<User, PostResponse<User>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<User>>('could not create user', {
          status: false,
        })
      )
    );
  }
  createManyUser(api: string, data: User[]) {
    return this.http.post<User[], PostResponse<User[]>>(api, data).pipe(
      catchError(
        this.http.handleError<PostResponse<User[]>>('could not create users', {
          status: false,
        })
      )
    );
  }
}
