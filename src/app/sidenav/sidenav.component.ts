import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Utils} from '../utils';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  communities: Array<any>;
  communitiesFavorited: Array<any>;

  private utils = Utils;

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
