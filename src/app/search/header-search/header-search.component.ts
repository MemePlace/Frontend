import { Component, OnInit } from '@angular/core';
import {Utils} from '../../utils';
import {MobileSearchDialogComponent} from '../mobile-search-dialog/mobile-search-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  showBar = false;
  private utils = Utils;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  toggle() {
    if (Utils.isMobile) {
      this.openMobileDialog();
    }
    else {
      this.showBar = !this.showBar;
    }
  }

  openMobileDialog() {
    const dialog = this.dialog.open(MobileSearchDialogComponent, {
      width: 400
    });

    dialog.afterClosed().subscribe((query) => {
      console.log(query);
    });
  }
}
