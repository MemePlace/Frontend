import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

@Injectable()
export class UserService {

  constructor(private api: BaseApiService) { }

  isLoggedIn(): boolean {

  }

  isUsernameTaken(): boolean {

  }

  login(username: string, password: string) {

  }

  signup(email: string, username: string, password: string) {

  }

  getDetails() {

  }
}
