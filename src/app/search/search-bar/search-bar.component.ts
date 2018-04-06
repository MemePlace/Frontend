import {Component, Input, OnInit} from '@angular/core';
import {SearchService, AutocompleteResults} from '../../api/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() barWidth = '100%';

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
    return option.username || option.name || '';
  }
}
