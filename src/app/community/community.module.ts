import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MemeCardComponent } from '../meme-card/meme-card.component';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [BrowseComponent, MemeCardComponent]
})
export class CommunityModule { }
