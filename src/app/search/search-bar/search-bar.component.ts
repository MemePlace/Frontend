import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchService, AutocompleteResults} from '../../api/search.service';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() barWidth;
  @Input() placeholder = 'Search';
  @Output() optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  text: string;

  private autocompleteTimeout;
  options: AutocompleteResults = {};

  constructor(private searchService: SearchService) { }

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
    if (option) {
      return option.username || option.name || '';
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event);
  }

  resetText() {
    this.text = '';
  }
}
