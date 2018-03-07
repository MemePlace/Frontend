import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';

import {MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
  ],
  declarations: [BrowseComponent]
})
export class CommunityModule { }
