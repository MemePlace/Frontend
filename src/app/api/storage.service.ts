import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  get(key: string) {
    return localStorage.getItem(key);
  }

  getJSON(key: string): {} {
    try {
      return JSON.parse(localStorage.getItem(key));
    }
    catch(e) {
      return null;
    }
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  setJSON(key: string, value: {}) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  exists(key: string) {
    return localStorage.getItem(key) !== null;
  }


}
