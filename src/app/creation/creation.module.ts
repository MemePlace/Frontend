import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import {MatFormFieldModule, MatInputModule, MatGridListModule, MatSliderModule, MatSnackBarModule, MatIconModule} from '@angular/material';

import { FormsModule } from '@angular/forms';

import { CreationComponent } from './creation.component';
import { FabricComponent } from './fabric/fabric.component';
import { FunctionBarComponent } from './function-bar/function-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {ImgurService} from './imgur.service';
import {SearchModule} from '../search/search.module';
import {ResizableModule} from 'angular-resizable-element';
import { TextEditToolbarComponent } from './text-edit-toolbar/text-edit-toolbar.component';


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
    MatSnackBarModule,
    ResizableModule,
    MatIconModule
  ],
  providers: [
    ImgurService
  ],
  declarations: [CreationComponent, FabricComponent, FunctionBarComponent, TextEditToolbarComponent]
})
export class CreationModule { }
