import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import {MatFormFieldModule, MatInputModule, MatGridListModule, MatSliderModule, MatSnackBarModule} from '@angular/material';

import { FormsModule } from '@angular/forms';

import { CreationComponent } from './creation.component';
import { FabricComponent } from './fabric/fabric.component';
import { FunctionBarComponent } from './function-bar/function-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {ImgurService} from './imgur.service';
import {SearchModule} from '../search/search.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    SearchModule,
    MatSnackBarModule
  ],
  providers: [
    ImgurService
  ],
  declarations: [CreationComponent, FabricComponent, FunctionBarComponent]
})
export class CreationModule { }
