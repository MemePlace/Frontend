import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { UserService } from './user.service';
import { CommunityService } from './community.service';
import { SearchService } from './search.service';
import { MemeService } from './meme.service';
import {StorageService} from './storage.service';
import {AuthGuardService} from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    BaseApiService,
    UserService,
    MemeService,
    CommunityService,
    SearchService,
    StorageService
  ]
})
export class ApiModule { }
