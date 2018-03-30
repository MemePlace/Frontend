import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule} from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileSearchDialogComponent } from './mobile-search-dialog/mobile-search-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [SearchBarComponent, MobileSearchDialogComponent],
  entryComponents: [MobileSearchDialogComponent],
  exports: [SearchBarComponent]
})
export class SearchModule { }
