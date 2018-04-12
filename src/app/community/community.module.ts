import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MemeCardComponent } from '../meme-card/meme-card.component';
import { CreateComponent } from './create/create.component';
import {
  MatTabsModule, MatIconModule, MatCardModule, MatButtonModule, MatTooltipModule, MatSnackBarModule,
  MatToolbarModule, MatChipsModule, MatDividerModule, MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { MemeViewComponent } from './meme-view/meme-view.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  declarations: [BrowseComponent, MemeCardComponent, CreateComponent, ToolbarComponent, DetailsDialogComponent, MemeViewComponent],
  entryComponents: [DetailsDialogComponent]
})
export class CommunityModule { }
