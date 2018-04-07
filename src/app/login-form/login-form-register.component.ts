import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User, UserService} from '../api/user.service';

import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: `app-login-form-register.component`,
  templateUrl: 'login-form-register.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormRegisterComponent {
  constructor(public dialogRef: MatDialogRef<LoginFormRegisterComponent>,
              private userService: UserService,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  usernameRegisterText: string;
  passwordRegisterText: string;
  emailText: string;
  users: User = {
    id: 0,
    username: '',
  };
  hideInvalidText = true;
  errorMessage: string;

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  registerValidate() {
      // Validate user registration by calling signup from UserService
    if (!this.emailText) {
      // Runs this code if e-mail textbox is empty
      this.userService.signup(this.usernameRegisterText, this.passwordRegisterText).then((user) => {
        this.users = user;
        this.snackBar.open('Welcome to MemePlace!', 'close', {
          duration: 3000
        });
        this.dialogRef.close();
      }).catch((err) => {
        this.hideInvalidText = false;
        this.errorMessage = err.toString();
      });
    } else {
      // Runs this code when e-mail has a value
      this.userService.signup(this.usernameRegisterText, this.passwordRegisterText, this.emailText).then((user) => {
        this.users = user;
        this.snackBar.open('Welcome to MemePlace!', 'close', {
          duration: 3000
        });
        this.dialogRef.close();
      }).catch((err) => {
        this.hideInvalidText = false;
        this.errorMessage = err.toString();
      });
    }
  }

  cancel(): void {
    // Go to Login/Main page from register page
    this.dialogRef.close();
  }
}
