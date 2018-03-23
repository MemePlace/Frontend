import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginValidate(){
      // Validate user login
  }
  
  registerPage(){
      // Go to register page from login page
  }
  
  registerValidate(){
      // Validate user registration
  }
  
  cancel(){
      // Go to Login page from register page
  }
  
  
}
