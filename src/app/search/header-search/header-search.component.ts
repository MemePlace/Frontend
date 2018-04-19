import { Component, OnInit } from '@angular/core';
import {Utils} from '../../utils';
import {MobileSearchDialogComponent} from '../mobile-search-dialog/mobile-search-dialog.component';
import {MatAutocompleteSelectedEvent, MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  utils = Utils;

  constructor(private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }

  openMobileDialog() {
    const dialog = this.dialog.open(MobileSearchDialogComponent, {
      width: '400px'
    });

    dialog.afterClosed().subscribe((event) => {
      if (event) {
        this.onSelect(event);
      }
    });
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['c', event.option.value.name]);
  }
}
