import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User, UserService} from '../api/user.service';

import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
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
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }

  usernameRegisterText: string;
  passwordRegisterText: string;
  emailText: string;
  hideInvalidText = true;
  errorMessage: string;
  public nameTimeout;
  form: FormGroup;

  createForm() {
    this.form = this.formBuilder.group( {
      username: ['', [Validators.required], [this.nameExists.bind(this)]],
      password: ['', Validators.required],
      email: '',
    });
  }

  nameExists(control: FormControl) {
    clearTimeout(this.nameTimeout);

    return new Promise((resolve, reject) => {
      this.nameTimeout = setTimeout(() => {
        this.userService.isUsernameAvailable(control.value).then((exists) => {
          if (exists) {
            resolve({nameExists: true});
          } else {
            resolve(null);
          }
        }).catch((err) => resolve(null));
      }, 250);
    });
  }


  registerValidate() {
      // Validate user registration by calling signup from UserService
      this.userService.signup(this.form.value.username, this.form.value.password, this.form.value.email).then((user) => {
        this.snackBar.open('Welcome to MemePlace!', 'close', {
          duration: 3000
        });
        this.dialogRef.close();
      }).catch((err) => {
        this.hideInvalidText = false;
        this.errorMessage = err.toString();
      });
  }

  cancel(): void {
    // Go to Login/Main page from register page
    this.dialogRef.close();
  }
}
