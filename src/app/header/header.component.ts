import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User, UserService} from '../api/user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginFormComponent} from '../login-form/login-form.component';
import {LoginFormRegisterComponent} from '../login-form/login-form-register.component';
import {MatSnackBar} from '@angular/material';
import {Utils} from '../utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle: EventEmitter<null> = new EventEmitter();
  utils = Utils;

  constructor(public dialog: MatDialog,
              public userService: UserService,
              public snackBar: MatSnackBar) { }


  ngOnInit() { }

  toggle() {
    this.sidebarToggle.emit();
  }

  registerPage() {
    // Open dialog box to Register page
    const openRegister = this.dialog.open(LoginFormRegisterComponent, {
      width: '360px',
    });
  }

  loginPage() {
    // Open dialog box to Login page
    const openLogin = this.dialog.open(LoginFormComponent, {
      width: '360px',
    });
  }

  gotoProfile() {
    // To be implemented
  }

  logout() {

    this.userService.logout().then(() => {
      // User logged out
    }).catch((err) => {
      this.snackBar.open('Failed to Logout: ' + err.toString(), 'close', {
        duration: 3000
      });
    });

  }
}
