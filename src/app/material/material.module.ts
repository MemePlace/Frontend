import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ]
})
export class MaterialModule { }
