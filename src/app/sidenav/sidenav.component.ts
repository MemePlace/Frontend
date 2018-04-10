import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Utils} from '../utils';
import {CommunityService} from '../api/community.service';
import {Community} from '../api/community.service';
import { resolve, reject } from 'q';

interface ICommunity extends Community {
  isFavourited: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  communities: Array<ICommunity> = [];
  communitiesFavourited: Array<ICommunity> = [];

  get sidebarWidth(): number {
    return 300;
  }

  utils = Utils;

  constructor(private _CommunityService: CommunityService) { }

  ngOnInit() {

    this._CommunityService.getCommunities('top', 10, 0).then(
      res => {
        resolve(res);
        this.communities = res.communities.map((entry: any) => {
          entry.isFavourited = false;
          return entry;
        });
      },
      err => {
        reject(err);
      }
    );
  }

  toggle() {
    this.sidenav.toggle();
  }

  toggleFavourite(community: any) {
    if (community.isFavourited === false) {
      community.isFavourited = true;
      this.communitiesFavourited.push(community);
      this.communitiesFavourited.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      community.isFavourited = false;
      this.communitiesFavourited = this.communitiesFavourited.filter((com) => {
        return com !== community;
      });
    }
  }
}
