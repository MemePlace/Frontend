import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MemeCardComponent } from '../meme-card/meme-card.component';
import { CreateComponent } from './create/create.component';
import {MatTabsModule, MatIconModule, MatCardModule, MatButtonModule, MatTooltipModule, MatSnackBarModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  declarations: [BrowseComponent, MemeCardComponent, CreateComponent]
})
export class CommunityModule { }
