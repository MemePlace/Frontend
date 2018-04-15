import {Injectable} from '@angular/core';
import {BaseApiService, Version} from './base-api.service';
import {StorageService, StorageType} from './storage.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';

export interface User {
  id: number;
  username: string;
}

@Injectable()
export class UserService {
  private loggedIn = false;
  private user_: User;

  private loggedInSource = new Subject<boolean>();
  loggedIn$ = this.loggedInSource.distinctUntilChanged().asObservable();

  set user(value) {
    this.loggedInSource.next(value !== null);
    this.user_ = value as User;
  }

  get user(): User {
    if (this.user_) {
      return this.user_;
    }

    // Check localstorage and session storage
    const user = this.storageService.getJSON(StorageType.local, 'user')
      || this.storageService.getJSON(StorageType.session, 'user');

    if (user) {
      this.user_ = user as User;
      return this.user_;
    }

    return null;
  }

  constructor(private api: BaseApiService, private storageService: StorageService) {
    // check if they are logged in
    this.getDetails(true).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.error('User is not logged in');

      // delete storage if their cookies expired
      this.storageService.remove(StorageType.local, 'user');
      this.storageService.remove(StorageType.session, 'user');
    });
  }

  isLoggedIn() {
    return this.user !== null;
  }

  isUsernameAvailable() {
    throw new Error('Method not implemented');
  }

  /**
   * Logs out the currently logged in user
   */
  logout() {
    if (!this.isLoggedIn()) {
      return;
    }

    return this.api.put(Version.v1, 'auth/logout', {}).then((user) => {
      this.user = null;
      this.loggedIn = false;

      // remove in session storage
      this.storageService.remove(StorageType.local, 'user');
      this.storageService.remove(StorageType.session, 'user');
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

      if (rememberMe) {
        this.storageService.setJSON(StorageType.local, 'user', user);
      }
      else {
        this.storageService.setJSON(StorageType.session, 'user', user);
      }

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
    const body: any = {username, password};

    if (email) {
      // Adds email to body (works despite the error showing on webstorm)
      body.email = email;
    }

    return this.api.post(Version.v1, 'users', body).then((user: User) => {
      this.user = user;
      this.loggedIn = true;

      this.storageService.setJSON(StorageType.session, 'user', user);

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
