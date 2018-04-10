import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {SidenavComponent} from './sidenav/sidenav.component';
import {HeaderComponent} from './header/header.component';
import {CommunityModule} from './community/community.module';
import {ApiModule} from './api/api.module';
import {MemeDialogComponent} from './meme-dialog/meme-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    MemeDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatSnackBarModule,
    CommunityModule,
    ApiModule,
    FormsModule,
  ],
  providers: [MemeDialogComponent],
  bootstrap: [AppComponent],
  entryComponents: [MemeDialogComponent],
})
export class AppModule { }
