import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenav, MatSnackBar, MatChip} from '@angular/material';
import {Utils} from '../utils';
import {UserService} from '../api/user.service';
import {CommunityService} from '../api/community.service';
import {Community} from '../api/community.service';
import {StorageService, StorageType} from '../api/storage.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('expansion') expansion: MatExpansionModule;
  @ViewChild('sidenav') sidenav: MatSidenav;
  communities: Array<Community> = [];
  communitiesFavourited: Array<Community> = [];
  sidebarState = true;
  loggedInSubscription: Subscription;
  userLoggedIn = false;

  get sidebarWidth(): number {
    return 300;
  }

  utils = Utils;

  constructor(
    public userService: UserService,
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
    // checks if user is logged in on page refresh
    if (this.userService.isLoggedIn()) {
      // user's favourite communities
      const user = await this.userService.getDetails(true);
    this.communitiesFavourited = await user.Favourites as Community[];
    }

    this.loggedInSubscription = this.userService.loggedIn$.subscribe(async (isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
      if (this.userLoggedIn) {
        // user's favourite communities
        const user = await this.userService.getDetails(true);
      this.communitiesFavourited = await user.Favourites as Community[];
      }
    });
    this.communities = communityList.communities;
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
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

  async Unfavourite(community: Community) {
    if (this.userService.isLoggedIn()) {
        // unfavourite community
        try {
          await this.userService.unfavouriteCommunity(community);
          } catch (err) {
          this.snackBar.open(`Failed to unfavourite: ${err.message}`, 'Close');
        }
    }
  }
}
