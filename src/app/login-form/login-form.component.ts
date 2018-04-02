import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
                private userService: UserService,
                public dialog: MatDialog) { }

    usernameLogin: string;
    passwordLogin: string;
    email: string;                
                
    ngOnInit() {
    }

    loginValidate(){
        // Validate user login
        this.userService.login(this.usernameLogin, this.passwordLogin).then((user) => {
//           this.users = user;
            this.dialogRef.close();      
        }).catch((err) =>{
            console.error(err);
        });
        
    }
  
    registerPage(){
        // Go to register page from login page
        let dialogRef = this.dialog.open(LoginFormRegister, {      
        
        })
    }
  
    cancel(): void{
        // Go to Login page from register page
        this.dialogRef.close();
    }
}

@Component({
    selector: 'login-form-register.component',
    templateUrl: 'login-form-register.component.html',
})
export class LoginFormRegister {
    constructor(public dialogRef: MatDialogRef<LoginFormRegister>,
                private userService: UserService,
                @Inject(MAT_DIALOG_DATA) public data: any) {}
                
    usernameRegister: string;
    passwordRegister: string;
    email: string;
//    users: 
    
    registerValidate(){
        // Validate user registration by calling signup from UserService
        this.userService.signup(this.usernameRegister, this.passwordRegister, this.email).then((user) => {
//           this.users = user;
            this.dialogRef.close();
        }).catch((err) =>{
            console.error(err);
        });
        
    }
                
    cancel(): void{
        // Go to Login/Main page from register page
        this.dialogRef.close();
    }
}