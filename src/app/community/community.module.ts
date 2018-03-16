import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MemeCardComponent } from '../meme-card/meme-card.component';
import { MatTabsModule, MatIconModule, MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [BrowseComponent, MemeCardComponent]
})
export class CommunityModule { }
