import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
                public dialog: MatDialog) { }

    ngOnInit() {
    }

    loginValidate(){
        // Validate user login
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
                @Inject(MAT_DIALOG_DATA) public data: any) {}
                
    registerValidate(){
        // Validate user registration
    }
                
    cancel(): void{
        // Go to Login page from register page
        this.dialogRef.close();
    }
}