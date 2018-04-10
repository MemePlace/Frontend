import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatTabsModule, MatListModule,
  MatExpansionModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatButtonToggleModule, MatOptionModule, MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
  ]
})
export class MaterialModule { }
