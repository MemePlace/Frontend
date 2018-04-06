import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { UserService } from './user.service';
import { SearchService } from './search.service';
import { MemeService } from './meme.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    BaseApiService,
    UserService,
    SearchService,
    MemeService
  ]
})
export class ApiModule { }
