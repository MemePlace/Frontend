import { Injectable } from '@angular/core';
import {StorageService, StorageType} from './storage.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SidebarService {
  private sideBarOpenSource = new Subject<boolean>();
  sideBarOpen$ = this.sideBarOpenSource.asObservable().distinctUntilChanged();
  sideBarOpen_ = false;

  set sideBarOpen(val: boolean) {
    this.storageService.set(StorageType.local, 'sideBarOpen', val.toString());
    this.sideBarOpenSource.next(val);
    this.sideBarOpen_ = val;
  }

  get sideBarOpen() {
    return this.sideBarOpen_;
  }

  constructor(private storageService: StorageService) {
    const storage = this.storageService.get(StorageType.local, 'sideBarOpen');

    if (storage === null) {
      this.sideBarOpen = true; // default true
    } else {
      this.sideBarOpen = storage === 'true';
    }
  }
}
