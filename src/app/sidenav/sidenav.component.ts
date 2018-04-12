import {Component, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Utils} from '../utils';
import {UserService} from '../api/user.service';
import {CommunityService} from '../api/community.service';
import {Community} from '../api/community.service';
import {StorageService, StorageType} from '../api/storage.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  communities: Array<Community> = [];
  communitiesFavourited: Array<Community> = [];
  sidebarState = true;

  get sidebarWidth(): number {
    return 300;
  }

  utils = Utils;

  constructor(
    private userService: UserService,
    private communityService: CommunityService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {

    if (this.storageService.get(StorageType.local, 'sidebarState') === 'close') {
      this.sidebarState = false;
    } else { this.sidebarState = true; }

    const communityList = await this.communityService.getCommunities('top', 10, 0);

    if (this.userService.isLoggedIn()) {
      const user = await this.userService.getDetails(true);
      this.communitiesFavourited = user.Favourites as Community[];
      this.communitiesFavourited.forEach((communityFav) => {
        communityFav.isFavourited = true;
      });
      communityList.communities.forEach((community: any) => {
        if (user.Favourites.filter(c => c.name === community.name).length > 0) {
          community.isFavourited = true;
        } else { community.isFavourited = false; }
      });
    }
    this.communities = communityList.communities;
    console.log(this.communities);
  }

  toggle() {
    this.sidenav.toggle();
    if (this.sidenav.opened === true) {
      this.storageService.set(StorageType.local, 'sidebarState', 'open');
      this.sidebarState = true;
    } else {
      this.storageService.set(StorageType.local, 'sidebarState', 'close');
      this.sidebarState = false;
    }
  }

  toggleFavourite(community: Community) {
    if (this.userService.isLoggedIn()) {
      if (community.isFavourited === false) {
        // favourite community
        this.communityService.favouriteCommunity(community.name);
        community.isFavourited = true;
        this.communitiesFavourited.push(community);
      } else {
        // unfavourite community
        this.communityService.deleteFavourite(community.name);
        this.communities[
          this.communities.map((c) => {
            return c.name;
          }).indexOf(community.name)].isFavourited = false;
        community.isFavourited = false;
        this.communitiesFavourited = this.communitiesFavourited.filter((com) => {
          return com !== community;
        });
      }
    }
  }
}
