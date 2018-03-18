import { Injectable, isDevMode } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators';


export enum Version {
  v1 = 'v1'
}

export interface Error {
  error: string;
}

const prodBase = 'http://api.meme.place';
const devBase = 'http://localhost:3000/api';

@Injectable()
export class BaseApiService {
  base = isDevMode() ? devBase : prodBase;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client side or network error
      throw new Error('Something bad happened, please try again later');
    } else {
      // Server error response
      throw new Error(error.error);
    }
  }

  get(version: Version, resource: string): Promise<{}|void> {
    return this.http.get(`${this.base}/${version}/${resource}`).toPromise().catch((err) => this.handleError(err));
  }

  post(version: Version, resource: string, data: {}): Promise<{}|void> {
    return this.http.post(`${this.base}/${version}/${resource}`, data).toPromise().catch((err) => this.handleError(err));
  }

  put(version: Version, resource: string, data: {}): Promise<{}|void> {
    return this.http.put(`${this.base}/${version}/${resource}`, data).toPromise().catch((err) => this.handleError(err));
  }

  delete(version: Version, resource: string): Promise<{}|void> {
    return this.http.delete(`${this.base}/${version}/${resource}`).toPromise().catch((err) => this.handleError(err));
  }
}
