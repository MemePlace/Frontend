import { Component, OnInit } from '@angular/core';
import {SearchService, AutocompleteResults} from '../../api/search.service';
import {Utils} from '../../utils';
import {MobileSearchDialogComponent} from '../mobile-search-dialog/mobile-search-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  private autocompleteTimeout;

  utils = Utils;
  options: AutocompleteResults = {};
  showBar = false;

  constructor(private searchService: SearchService,
              private dialog: MatDialog) { }

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

  toggle() {
    if (Utils.isMobile) {
      this.openMobileDialog();
    }
    else {
      this.showBar = !this.showBar;
    }
  }

  displayFn(option): string {
    return option.username || option.name || '';
  }

  openMobileDialog() {
    const dialog = this.dialog.open(MobileSearchDialogComponent, {
      width: '400px'
    });

    dialog.afterClosed().subscribe((query) => {
      console.log(query);
    });
  }
}
