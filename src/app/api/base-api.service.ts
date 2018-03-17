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
    return this.http.get(`${base}/${version}/${resource}`);
  }

  post(version: Version, resource: string, data: {}) {
    return this.http.post(`${base}/${version}/${resource}`, data);
  }

  put(version: Version, resource: string, data: {} | null) {
    return this.http.put(`${base}/${version}/${resource}`, data);
  }

  delete(version: Version, resource: string) {
    return this.http.delete(`${base}/${version}/${resource}`);
  }
}
