import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Utils} from '../utils';
import {UserService} from '../api/user.service';
import {CommunityService} from '../api/community.service';
import {Community} from '../api/community.service';
import { resolve, reject } from 'q';

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

  constructor(private _UserService: UserService, private _CommunityService: CommunityService) { }

  ngOnInit() {

    this._CommunityService.getCommunities('top', 10, 0)
    .then(
      communityList => {
      resolve(communityList);
      this._UserService.getDetails()
      .then(
        user => {
          resolve(user);
          communityList.communities.forEach((community: any) => {
            if(user.Favourites.filter(ele => ele.name === community.name).length > 0) {
              community.isFavourited = true;
              this.communitiesFavourited.push(community);
            } 
            else community.isFavourited = false;
          });
          this.communitiesFavourited.sort((a, b) => a.title.localeCompare(b.title));
          this.communities = communityList.communities;
        }).catch((err) => reject(err));
    }).catch((err) => reject(err));
  }

  toggle() {
    this.sidenav.toggle();
  }

  toggleFavourite(community: Community) {
    if (community.isFavourited === false) {
      community.isFavourited = true;
      this._CommunityService.favouriteCommunity(community.name)
      .then(msg => {
        resolve(msg);
        console.log(msg);
      }).catch((err) => resolve(null));
      this.communitiesFavourited.push(community);
      this.communitiesFavourited.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      community.isFavourited = false;
      this._CommunityService.deleteFavourite(community.name)
      .then(msg => {
        resolve(msg);
        console.log(msg);
      }).catch((err) => resolve(null));
      this.communitiesFavourited = this.communitiesFavourited.filter((com) => {
        return com !== community;
      });
    }
  }
}
