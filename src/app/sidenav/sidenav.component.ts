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
    // populate 20 random communities
    for (let i = 0; i < 20; i++) {
      this.communities.push({ communityname: this.communityName = 'Community ' + i, 
      isFavorited: this.isFavorited, 
      favouriteCount: Math.floor(Math.random()*(101))});
    }
    for (let community of this.communities) {
      if (community.isFavorited === true) this.communitiesFavorited.push(community);
    }
    this.communities.sort((a, b) => b.favouriteCount - a.favouriteCount);
    this.communitiesFavorited.sort((a, b) => a.communityname.localeCompare(b.communityname));
    console.log(this.communities);
  }
  
  toggle() {
    this.sidenav.toggle();
  }

  favorite(i: any) {
    this.communities[i].isFavorited = true;
    this.communitiesFavorited.push(this.communities[i]);
    this.communitiesFavorited.sort((a, b) => a.communityname.localeCompare(b.communityname));
  }
  removeFavorite(i: any) {
    this.communities[i].isFavorited = false;
    let index = this.communitiesFavorited.indexOf(this.communities[i]);
    if (index !== -1) this.communitiesFavorited.splice(index, 1);
  }
  removeFavoriteFromFav(i: any) {
    this.communitiesFavorited[i].isFavorited = false;
    let index = this.communities.indexOf(this.communitiesFavorited[i]);
    if (index !== -1) this.communities.splice(index, 1);
    this.communitiesFavorited.splice(i, 1);
  }
}