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
    rememberMeCheckbox: false;
    hideInvalidText = true;

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
        this.userService.login(this.usernameLoginText, this.passwordLoginText, this.rememberMeCheckbox).then((user) => {
            this.snackBar.open('Welcome to MemePlace!', 'close', {
              duration: 3000
            });

            this.dialogRef.close();
        }).catch(() => {
            this.hideInvalidText = false;
        });
    }

    cancel(): void {
        // Go to Login page from register page
        this.dialogRef.close();
    }
}

