import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User, UserService} from '../api/user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginFormComponent} from '../login-form/login-form.component';
import {LoginFormRegisterComponent} from '../login-form/login-form-register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle: EventEmitter<null> = new EventEmitter();

  constructor(public dialog: MatDialog,
              public userService: UserService) {
  }
  usernameText: string;
  users: User = {
    id: 0,
    username: '',
  };

  ngOnInit() {
    this.userService.getDetails().then((user) => {
      this.users = user;
      this.usernameText = this.users.username;
    }).catch(() => {
      // No cookie data
    });
  }

  toggle() {
    this.sidebarToggle.emit();
  }

  registerPage() {
    // Open dialog box to Register page
    const openRegister = this.dialog.open(LoginFormRegisterComponent);

    // When register dialog box closes, checks to see if a user is logged in
    openRegister.afterClosed().subscribe(() => {
      this.userService.getDetails().then((user) => {
        this.users = user;
        this.usernameText = this.users.username;
      }).catch(() => {
        // User hit cancel, nothing happens
      });
    });
  }

  loginPage() {
    // Open dialog box to Login page
    const openLogin = this.dialog.open(LoginFormComponent);

    // When login dialog box closes, checks to see if a user is logged in
    openLogin.afterClosed().subscribe(() => {
      this.userService.getDetails().then((user) => {
        this.users = user;
        this.usernameText = this.users.username;
      }).catch((err) => {
        // User hit cancel, nothing happens
      });
    });
  }

  gotoProfile() {
    console.log('test');
  }

  logout() {

    this.userService.logout().then(() => {
      // User logged out
    }).catch((err) => {
      // User failed to log out
      console.error(err);
    });

  }
}
