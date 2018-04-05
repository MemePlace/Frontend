import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule, MatInputModule, MatGridListModule, MatSliderModule} from '@angular/material';

import { FormsModule } from '@angular/forms';

import { CreationComponent } from './creation.component';
import { FabricComponent } from './fabric/fabric.component';
import { SizeComponent } from './size/size.component';
import { FunctionBarComponent } from './function-bar/function-bar.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSliderModule,
    FormsModule,
  ],
  declarations: [CreationComponent, FabricComponent, SizeComponent, FunctionBarComponent]
})
export class CreationModule { }
