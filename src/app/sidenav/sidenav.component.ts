import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isBookmarked = false;
  communityName: String;
  communities: Array<any>;

  get screenWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  get isMobile(): boolean {
    return this.screenWidth <= 1000;
  }

  get sidebarWidth(): number {
    return 300;
  }

  constructor() { }

  ngOnInit() {
    this.communities = new Array();
    this.communities = [
      { communityname: this.communityName = 'Community 1', isbookmarked: this.isBookmarked },
      { communityname: this.communityName = 'Community 2', isbookmarked: this.isBookmarked }
    ];
  }

  toggle() {
    this.sidenav.toggle();
  }

  bookmark(i: any) {
    this.communities[i].isbookmarked = true;
  }
  removeBookmark(i: any) {
    this.communities[i].isbookmarked = false;
  }
}
