import {Component, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';

import { MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
                private userService: UserService,
                public snackBar: MatSnackBar) { }

    usernameLoginText: string;
    passwordLoginText: string;
    RememberMeCheckbox: false;
    hideInvalidText = false;

    usernameFormControl = new FormControl('', [
      Validators.required,
    ]);

    passwordFormControl = new FormControl('', [
      Validators.required,
    ]);

    ngOnInit() {
    }

    loginValidate() {
        // Validate user login
        this.userService.login(this.usernameLoginText, this.passwordLoginText).then((user) => {
            this.snackBar.open('Successfully Logged In!', 'close');
            console.log('made it into then, login');
            this.dialogRef.close();
        }).catch(() => {
            console.log('login fail');
            this.hideInvalidText = true;
            this.snackBar.open('Invalid Login Credentials', 'close');

        });
    }

    cancel(): void {
        // Go to Login page from register page
        this.dialogRef.close();
    }
}

