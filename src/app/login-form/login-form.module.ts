import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatIconModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {LoginFormComponent} from './login-form.component';
import {LoginFormRegisterComponent} from './login-form-register.component';
import {MatDialogModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [LoginFormComponent, LoginFormRegisterComponent],
  entryComponents: [LoginFormComponent, LoginFormRegisterComponent],
})
export class LoginFormModule { }
