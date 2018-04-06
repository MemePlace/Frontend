import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../api/user.service';

import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'login-form-register.component',
  templateUrl: 'login-form-register.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormRegisterComponent {
  constructor(public dialogRef: MatDialogRef<LoginFormRegisterComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  usernameRegisterText: string;
  passwordRegisterText: string;
  emailText: string;

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  registerValidate() {
    // Validate user registration by calling signup from UserService
    this.userService.signup(this.usernameRegisterText, this.passwordRegisterText, this.emailText).then((user) => {
//           this.users = user;
      this.dialogRef.close();
    }).catch((err) => {
      console.error(err);
    });

  }

  cancel(): void {
    // Go to Login/Main page from register page
    this.dialogRef.close();
  }
}
