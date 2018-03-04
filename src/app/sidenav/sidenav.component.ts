import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.sidenav.toggle();
  }

  isMobile(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return width <= 700;
  }
}
