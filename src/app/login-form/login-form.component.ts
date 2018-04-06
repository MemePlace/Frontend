import {Component, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';

import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
                private userService: UserService,
                public dialog: MatDialog) { }

    usernameLoginText: string;
    passwordLoginText: string;
    RememberMeCheckbox: false;

    usernameFormControl = new FormControl('', [
      Validators.required,
    ]);

    passwordFormControl = new FormControl('', [
      Validators.required,
    ]);

    ngOnInit() {
    }

    loginValidate(){
        // Validate user login
        this.userService.login(this.usernameLoginText, this.passwordLoginText).then((user) => {
            this.dialogRef.close();
        }).catch((err) => {
            console.error(err);
        });
    }

    cancel(): void {
        // Go to Login page from register page
        this.dialogRef.close();
    }
}

