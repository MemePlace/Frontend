import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRoutingModule } from './creation-routing.module';
import { CreationComponent } from './creation.component';
import { FabricComponent } from './fabric/fabric.component';

@NgModule({
  imports: [
    CommonModule,
    CreationRoutingModule
  ],
  declarations: [CreationComponent, FabricComponent]
})
export class CreationModule { }
