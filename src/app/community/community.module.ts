import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MemeCardComponent } from '../meme-card/meme-card.component';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { CreationComponent } from './creation/creation.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
  ],
  declarations: [BrowseComponent, MemeCardComponent, CreationComponent]
})
export class CommunityModule { }
