import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SearchService, AutocompleteResults} from '../../api/search.service';

@Component({
  selector: 'app-mobile-search-dialog',
  templateUrl: './mobile-search-dialog.component.html',
  styleUrls: ['./mobile-search-dialog.component.scss']
})
export class MobileSearchDialogComponent implements OnInit {
  private autocompleteTimeout;
  options: AutocompleteResults = {};

  constructor(private searchService: SearchService,
              public dialogRef: MatDialogRef<MobileSearchDialogComponent>) { }

  ngOnInit() {
  }

  onKey(value: string) {
    this.populateAutocomplete(value);
  }

  populateAutocomplete(value: string) {
    clearTimeout(this.autocompleteTimeout);

    if (!value) {
      this.options = {};
      return;
    }

    this.autocompleteTimeout = setTimeout(() => {
      this.searchService.getAutocompleteResults(value).then((results) => {
        this.options = results;
      }).catch((err) => {
        console.error(err);
      });
    }, 250);
  }

  displayFn(option): string {
    return option.username || option.name || '';
  }

  close() {
    this.dialogRef.close();
  }
}
