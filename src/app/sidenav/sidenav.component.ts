import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenav, MatSnackBar} from '@angular/material';
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
  @ViewChild('expansion') expansion: MatExpansionModule;
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
    private storageService: StorageService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit() {
    // check if sidenavbar is open or closed
    if (this.storageService.get(StorageType.local, 'sidebarState') === 'close') {
      this.sidebarState = false;
    } else { this.sidebarState = true; }

    const communityList = await this.communityService.getCommunities('top', 10, 0);

    if (this.userService.isLoggedIn()) {
      const user = await this.userService.getDetails(true);
      this.communitiesFavourited = user.Favourites as Community[];
      // filter out favourited communities that are in the top 10 communities
      communityList.communities.forEach((community: any) => {
        if (user.Favourites.filter(c => c.name === community.name).length > 0) {
          community.favourited = true;
        } else { community.favourited = false; }
      });
    }
    this.communities = communityList.communities;
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

  async toggleFavourite(community: Community) {
    if (this.userService.isLoggedIn()) {
      if (community.favourited === false) {
        // favourite community
        try {
          await this.userService.favouriteCommunity(community);
          community.favourited = true;
          const user = await this.userService.getDetails(true);
          this.communitiesFavourited = user.Favourites as Community[];
        } catch(err) {
          this.snackBar.open(`Failed to favourite: ${err.message}`, 'Close');
        }
      } else {
        // unfavourite community
        try {
          await this.userService.unfavouriteCommunity(community);
          this.communities[this.communities.map((c) => c.name).indexOf(community.name)].favourited = false;
          community.favourited = false;
          this.communitiesFavourited = this.communitiesFavourited.filter((com) => {
            return com !== community;
          });
          } catch(err) {
          this.snackBar.open(`Failed to unfavourite: ${err.message}`, 'Close');
        }
      }
    }
  }
}
