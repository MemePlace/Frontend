import { Injectable } from '@angular/core';

export enum StorageType {
  local,
  session
}

const typeMap = {
  [StorageType.local]: localStorage,
  [StorageType.session]: sessionStorage
};

@Injectable()
export class StorageService {

  constructor() { }

  get(type: StorageType, key: string) {
    return typeMap[type].getItem(key);
  }

  getJSON(type: StorageType, key: string): {} {
    try {
      return JSON.parse(typeMap[type].getItem(key));
    }
    catch(e) {
      return null;
    }
  }

  set(type: StorageType, key: string, value: string) {
    typeMap[type].setItem(key, value);
  }

  setJSON(type: StorageType, key: string, value: {}) {
    typeMap[type].setItem(key, JSON.stringify(value));
  }

  exists(type: StorageType, key: string) {
    return typeMap[type].getItem(key) !== null;
  }

  remove(type: StorageType, key: string) {
    typeMap[type].removeItem(key);
  }

  clear(type: StorageType) {
    typeMap[type].clear();
  }
}
