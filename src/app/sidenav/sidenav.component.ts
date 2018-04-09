import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Utils} from '../utils';

export interface Community {
  name: string;
  title: string;
  description?: string;
  sidebar?: string;
  nsfw?: boolean;
  creatorId: number;
  isFavourited: boolean;
  favouriteCount: number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  communities: Array<Community> = [];
  communitiesFavourited: Array<Community> = [];

  get sidebarWidth(): number {
    return 300;
  }

  utils = Utils;

  constructor() { }

  ngOnInit() {
    // populate 20 random communities
    for (let i = 0; i < 20; i++) {
      this.communities.push({
        name: 'Community' + i,
        title: 'Community ' + i,
        creatorId: Math.floor(Math.random() * (100001)),
        isFavourited: false,
        favouriteCount: Math.floor(Math.random() * (101))});
    }
    for (const community of this.communities) {
      if (community.isFavourited === true) { this.communitiesFavourited.push(community); }
    }
    this.communities.sort((a, b) => a.favouriteCount - b.favouriteCount);
  }

  toggle() {
    this.sidenav.toggle();
  }

  sortInt(a, b) {
    return a - b;
  }

  toggleFavourite(community: any) {
    if (community.isFavourited === false) {
      community.isFavourited = true;
      this.communitiesFavourited.push(community);
      this.communitiesFavourited.sort((a, b) => a.title.localeCompare(b.title));
      this.communities = this.communities.filter((com) => {
        return com !== community;
      });
    } else {
      community.isFavourited = false;
      this.communities.push(community);
      this.communities.sort((a, b) => a.favouriteCount - b.favouriteCount);
      this.communitiesFavourited = this.communitiesFavourited.filter((com) => {
        return com !== community;
      });
    }
  }
}
