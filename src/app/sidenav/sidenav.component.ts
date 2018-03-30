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
  communities: Array<any> = [];
  communitiesFavourited: Array<any> = [];

  get sidebarWidth(): number {
    return 300;
  }

  private utils = Utils;

  constructor() { }

  ngOnInit() {
    // populate 20 random communities
    for (let i = 0; i < 20; i++) {
      this.communities.push({ communityname: 'Community ' + i,
      isFavourited: false,
      favouriteCount: Math.floor(Math.random() * (101))});
    }
    for (const community of this.communities) {
      if (community.isFavourited === true) { this.communitiesFavourited.push(community); }
    }
  }

  toggle() {
    this.sidenav.toggle();
  }

  toggleFavourite(community: any) {
    if (community.isFavourited === false) {
      community.isFavourited = true;
      this.communitiesFavourited.push(community);
      this.communitiesFavourited.sort((a, b) => a.communityname.localeCompare(b.communityname));
    } 
    else {
      community.isFavourited = false;
      this.communitiesFavourited = this.communitiesFavourited.filter((com) => {
        return com !== community;
      });
    }
  }
}
