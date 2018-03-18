import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';
import {Observable} from 'rxjs/Observable';

export interface User {
  id: number;
  username: string;
}

@Injectable()
export class UserService {
  private loggedIn = false;
  private user: User;

  constructor(private api: BaseApiService) { }

  isLoggedIn() {
    return this.loggedIn;
  }

  isUsernameAvailable() {
    throw new Error('Method not implemented');
  }

  logout() {
    if (!this.isLoggedIn()) return;

    throw new Error('Method not implemented');
  }

  login(username: string, password: string): Observable<User> {
    return this.api.post(Version.v1, 'auth', {username, password}).map((user: User) => {
      this.user = user;
      this.loggedIn = true;
      return user;
    });
  }

  signup(email: string, username: string, password: string): Observable<User> {
    return this.api.post(Version.v1, 'users', {email, username, password}).map((user: User) => {
      this.user = user;
      this.loggedIn = true;
      return user;
    });
  }

  getDetails(): User|void {
    if (this.isLoggedIn()) {
      return this.user;
    }
  }
}
