import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRoutingModule } from './creation-routing.module';
import { CreationComponent } from './creation/creation.component';

@NgModule({
  imports: [
    CommonModule,
    CreationRoutingModule
  ],
  declarations: [CreationComponent]
})
export class CreationModule { }
