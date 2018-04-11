import {Component, OnInit} from '@angular/core';
import {Utils} from '../../utils';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  routeSubscription: Subscription;
  utils = Utils;

  communityName: string;

  constructor(private route: ActivatedRoute) { }

  user1 = {height: '300', memeId: 8};
  user2 = {height: '300', memeId: 9};
  user3 = {height: '300', memeId: 10};
  user4 = {height: '300', memeId: 11};
  user5 = {height: '300', memeId: 12};
  user6 = {height: '300', memeId: 13};
  user7 = {height: '300', memeId: 14};
  user8 = {height: '300', memeId: 15};

  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6, this.user7, this.user8];

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      if (params.name) {
        this.communityName = params.name;
      }
    });
  }

  getMemes() {
    // TODO
  }

  getMemeDetail() {

  }

}
