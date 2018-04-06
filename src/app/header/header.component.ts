import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginFormComponent} from '../login-form/login-form.component';
import {LoginFormRegisterComponent} from '../login-form/login-form-register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle: EventEmitter<null> = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  toggle() {
    this.sidebarToggle.emit();
  }

  registerPage() {
    // Open dialog box to Register page
    const openRegister = this.dialog.open(LoginFormRegisterComponent);
  }

  loginPage() {
    // Open dialog box to Login page
    const openLogin = this.dialog.open(LoginFormComponent);
  }
}
