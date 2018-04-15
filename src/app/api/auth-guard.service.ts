import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.snackBar.open('You must be logged in to go there!', 'Close');
      return false;
    }
  }
}
