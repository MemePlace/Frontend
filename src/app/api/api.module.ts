import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseApiService } from './base-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [BaseApiService]
})
export class ApiModule { }
