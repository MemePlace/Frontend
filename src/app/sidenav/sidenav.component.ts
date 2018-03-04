import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  get screenWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  get isMobile(): boolean {
    return this.screenWidth <= 700;
  }

  get sidebarWidth(): number {
    return (this.isMobile) ? this.screenWidth * 0.8 : 250;
  }

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.sidenav.toggle();
  }
}
