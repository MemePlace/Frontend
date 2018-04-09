import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatTabsModule, MatListModule,
  MatExpansionModule, MatCheckboxModule, MatMenuModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
  ]
})
export class MaterialModule { }
