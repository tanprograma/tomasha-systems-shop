import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}
  parseString(item: any) {
    return `${item}`;
  }
}
