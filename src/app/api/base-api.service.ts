import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum Version {
  v1 = 'v1'
}

const prodBase = 'api.meme.place';
const devBase = '';

@Injectable()
export class BaseApiService {
  base = isDevMode() ? devBase : prodBase;

  constructor(private http: HttpClient) { }

  get(version: Version, resource: string) {
    console.log(resource);
    return this.http.get(`${this.base}/${version}/${resource}`);
  }

  post(version: Version, resource: string, data: {}) {
    return this.http.post(`${this.base}/${version}/${resource}`, data);
  }

  put(version: Version, resource: string, data: {}) {
    return this.http.put(`${this.base}/${version}/${resource}`, data);
  }

  delete(version: Version, resource: string) {
    return this.http.delete(`${this.base}/${version}/${resource}`);
  }
}
