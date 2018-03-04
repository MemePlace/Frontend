import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
  ]
})
export class MaterialModule { }
