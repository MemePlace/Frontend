import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  communities: Array<any>;
  communitiesFavorited: Array<any>;

  // I would like screenWidth and isMobile to be accessible from multiple components but don't know how
  get screenWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  // I'm not sure if 1000px is a great cutoff point - seems a bit too big (maybe decrease to ~768px?)
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
    // populate 20 random communities
    for (let i = 0; i < 20; i++) {
      this.communities.push({ communityname: 'Community ' + i,
      isFavorited: false,
      favouriteCount: Math.floor(Math.random() * (101))});
    }
    for (const community of this.communities) {
      if (community.isFavorited === true) { this.communitiesFavorited.push(community); }
    }
  }

  toggle() {
    this.sidenav.toggle();
  }

  favorite(community: any) {
    community.isFavorited = true;
    this.communitiesFavorited.push(community);
    this.communitiesFavorited.sort((a, b) => a.communityname.localeCompare(b.communityname));
  }

  removeFavorite(community: any) {
    community.isFavorited = false;
    this.communitiesFavorited = this.communitiesFavorited.filter((com) => {
      return com !== community;
    });
  }

  removeFavoriteFromFav(communityFav: any) {
    communityFav.isFavorited = false;
    this.communitiesFavorited = this.communitiesFavorited.filter((com) => {
    return com !== communityFav;
    });
  }
}
