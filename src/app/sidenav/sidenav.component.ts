import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenav, MatSnackBar, MatChip} from '@angular/material';
import {Utils} from '../utils';
import {UserService} from '../api/user.service';
import {CommunityService} from '../api/community.service';
import {Community} from '../api/community.service';
import {Subscription} from 'rxjs/Subscription';
import {SidebarService} from '../api/sidebar.service';

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
  loggedInSubscription: Subscription;

  get userLoggedIn() {
    return this.userService.isLoggedIn();
  }

  get sidebarWidth(): number {
    return 300;
  }

  get sidebarState() {
    return this.sidebarService.sideBarOpen;
  }

  utils = Utils;

  constructor(
    public userService: UserService,
    private communityService: CommunityService,
    private snackBar: MatSnackBar,
    private sidebarService: SidebarService,
  ) { }

  async ngOnInit() {
    const communityList = await this.communityService.getCommunities('top', 10, 0);

    // checks if user is logged in on page refresh
    if (this.userLoggedIn) {
      // user's favourite communities
      const user = await this.userService.getDetails(true);
      this.communitiesFavourited = await user.Favourites as Community[];
    }

    this.loggedInSubscription = this.userService.loggedIn$.subscribe(async (isLoggedIn) => {
      if (isLoggedIn) {
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
    this.sidebarService.sideBarOpen = this.sidenav.opened;
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
