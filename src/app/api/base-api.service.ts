import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum Version {
  v1 = 'v1'
}

@Injectable()
export class BaseApiService {

  constructor(private http: HttpClient) { }

  get(version: Version, resource: string) {
    return this.http.get(`/${version}/${resource}`);
  }

  post(version: Version, resource: string, data: {}) {
    return this.http.post(`/${version}/${resource}`, data);
  }

  put(version: Version, resource: string, data: {} | null) {
    return this.http.put(`/${version}/${resource}`, data);
  }

  delete(version: Version, resource: string) {
    return this.http.delete(`/${version}/${resource}`);
  }
}
