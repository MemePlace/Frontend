import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

export interface User {
  id: number;
  username: string;
}

@Injectable()
export class UserService {
  private loggedIn = false;
  private user: User;

  constructor(private api: BaseApiService) {
    // check if they are logged in
    this.getDetails().then((user) => {
      console.log(user);
    }).catch((err) => {
      console.error('User is not logged in');
    });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  isUsernameAvailable() {
    throw new Error('Method not implemented');
  }

  /**
   * Logs out the currently logged in user
   */
  logout() {
    if (!this.isLoggedIn()) return;

    return this.api.put(Version.v1, 'auth/logout', {}).then((user) => {
      this.user = null;
      this.loggedIn = false;
    });
  }

  /**
   * Logs in a new user and returns their details
   * @param {string} username
   * @param {string} password
   * @param {boolean} rememberMe
   * @return {Promise<User>}
   */
  login(username: string, password: string, rememberMe: boolean): Promise<User> {
    return this.api.post(Version.v1, 'auth', {username, password, rememberMe}).then((user: User) => {
      this.user = user;
      this.loggedIn = true;
      return user;
    });
  }

  /**
   * Signs up a new user and automatically logs them in
   * @param {string} username
   * @param {string} password
   * @param {string?} email
   * @return {Promise<User>} New user details
   */
  signup(username: string, password: string, email?: string): Promise<User> {
    return this.api.post(Version.v1, 'users', {email, username, password}).then((user: User) => {
      this.user = user;
      this.loggedIn = true;
      return user;
    });
  }

  /**
   * Retrieves details for the currently logged in user
   * @param {boolean} force Optional variable to bypass the cache and fetch fresh data
   * @return {Promise<User>}
   */
  getDetails(force = false): Promise<User> {
    if (!force && this.isLoggedIn()) {
      return Promise.resolve(this.user);
    }

    // fetch it
    return this.api.get(Version.v1, 'me').then((user: User) => {
      this.user = user;
      this.loggedIn = true;
      return user;
    });
  }
}
