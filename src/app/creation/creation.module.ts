import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule, MatInputModule, MatGridListModule, MatSliderModule} from '@angular/material';

import { CreationComponent } from './creation.component';
import { FabricComponent } from './fabric/fabric.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSliderModule,
  ],
  declarations: [CreationComponent, FabricComponent]
})
export class CreationModule { }
