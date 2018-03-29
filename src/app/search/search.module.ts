import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent]
})
export class SearchModule { }
