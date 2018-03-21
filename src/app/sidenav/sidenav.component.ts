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
  communitiesFavorited: Array<any>;

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
    this.communitiesFavorited = new Array();
    for (let i = 0; i < 20; i++) {
      this.communities.push({ communityname: this.communityName = 'Community ' + i, isbookmarked: this.isBookmarked });
    }
    this.communities.sort((a, b) => a.communityname.localeCompare(b.communityname));
    for (let community of this.communities) {
      if (community.isbookmarked === true) this.communitiesFavorited.push(community);
    }
  }

  toggle() {
    this.sidenav.toggle();
  }

  bookmark(i: any) {
    this.communities[i].isbookmarked = true;
    this.communitiesFavorited.push(this.communities[i]);
  }
  removeBookmark(i: any) {
    this.communities[i].isbookmarked = false;
    let index = this.communitiesFavorited.indexOf(this.communities[i]);
    if (index !== -1) this.communitiesFavorited.splice(index, 1);
  }
}
