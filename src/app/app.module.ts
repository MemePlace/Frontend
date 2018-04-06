import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { CommunityModule } from './community/community.module';
import { ApiModule } from './api/api.module';
import { ReactiveFormsModule } from '@angular/forms';
import {LoginFormModule} from './login-form/login-form.module';
import {MatDialog} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    CommunityModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    LoginFormModule,
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
