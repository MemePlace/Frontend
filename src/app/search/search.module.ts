import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule} from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MobileSearchDialogComponent } from './mobile-search-dialog/mobile-search-dialog.component';
import { HeaderSearchComponent } from './header-search/header-search.component';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SearchBarComponent, MobileSearchDialogComponent, HeaderSearchComponent],
  entryComponents: [MobileSearchDialogComponent],
  exports: [HeaderSearchComponent, SearchBarComponent]
})
export class SearchModule { }
