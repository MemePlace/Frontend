import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isFavorited = false;
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
      this.communities.push({ communityname: this.communityName = 'Community ' + i, isFavorited: this.isFavorited });
    }
    for (let community of this.communities) {
      if (community.isFavorited === true) this.communitiesFavorited.push(community);
    }
    this.communitiesFavorited.sort((a, b) => a.communityname.localeCompare(b.communityname));
  }

  toggle() {
    this.sidenav.toggle();
  }

  favorite(i: any) {
    this.communities[i].isFavorited = true;
    this.communitiesFavorited.push(this.communities[i]);
  }
  removeFavorite(i: any) {
    this.communities[i].isFavorited = false;
    let index = this.communitiesFavorited.indexOf(this.communities[i]);
    if (index !== -1) this.communitiesFavorited.splice(index, 1);
  }
}
