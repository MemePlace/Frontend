import { Injectable, isDevMode } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators';

export enum Version {
  v1 = 'v1'
}

export interface Error {
  error: string;
}

const prodBase = 'api.meme.place';
const devBase = 'localhost:3000';

@Injectable()
export class BaseApiService {
  base = isDevMode() ? devBase : prodBase;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client side or network error
      console.error(error.error.message);
      return new ErrorObservable('Something bad happened, please try again later');
    } else {
      // Server error response
      return new ErrorObservable(error.error);
    }
  }

  get(version: Version, resource: string): Observable<{}> {
    return this.http.get(`${this.base}/${version}/${resource}`).pipe(catchError(this.handleError));
  }

  post(version: Version, resource: string, data: {}): Observable<{}> {
    return this.http.post(`${this.base}/${version}/${resource}`, data).pipe(catchError(this.handleError));
  }

  put(version: Version, resource: string, data: {}): Observable<{}> {
    return this.http.put(`${this.base}/${version}/${resource}`, data).pipe(catchError(this.handleError));
  }

  delete(version: Version, resource: string): Observable<{}> {
    return this.http.delete(`${this.base}/${version}/${resource}`).pipe(catchError(this.handleError));
  }
}
