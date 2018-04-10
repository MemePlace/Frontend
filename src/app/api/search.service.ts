import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

export interface AutocompleteResults {
  [type: string]: {}[];
}

@Injectable()
export class SearchService {

  constructor(private baseApiService: BaseApiService) {}

  getAutocompleteResults(query: string): Promise<AutocompleteResults> {
    return this.baseApiService.get(Version.v1, `search/${query}/autocomplete`) as Promise<AutocompleteResults>;
  }
}
