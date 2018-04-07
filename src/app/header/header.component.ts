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
      console.log("user was already logged in through cookies: " + this.usernameText);
    }).catch(() => {
      console.log('no user was logged in');
    });
  }

  toggle() {
    this.sidebarToggle.emit();
  }

  registerPage() {
    // Open dialog box to Register page
    const openRegister = this.dialog.open(LoginFormRegisterComponent);

    openRegister.afterClosed().subscribe(() => {
      this.userService.getDetails().then((user) => {
        this.users = user;
        this.usernameText = this.users.username;
        console.log("made it into openRegister, usernameText = " + this.usernameText);
      }).catch(() => {
        console.log('user did not finish registering');
      });
    });
  }

  loginPage() {
    // Open dialog box to Login page
    const openLogin = this.dialog.open(LoginFormComponent);

    openLogin.afterClosed().subscribe(() => {
      this.userService.getDetails().then((user) =>{
        this.users = user;
        this.usernameText = this.users.username;
        console.log("made it into openLogin, usernameText = " + this.usernameText);
      }).catch(() => {
        console.log('user did not finish logging in');
      });
    });
  }

  gotoProfile() {
    console.log("test");
  }

  logout() {

    this.userService.logout().then(() => {
      console.log("logoutSuccess");
    }).catch(() => {
      console.log('logout fail');
    });

  }
}
