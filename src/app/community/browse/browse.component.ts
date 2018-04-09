import {Component, OnInit} from '@angular/core';
import {Utils} from '../../utils';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  utils = Utils;

  constructor() { }

  user1 = {un: 'shining777', height: '300', memeId: 8};
  user2 = {un: 'dante888', height: '300', memeId: 9};
  user3 = {un: 'step7750', height: '300', memeId: 10};
  user4 = {un: 'clayton123', height: '300', memeId: 11};
  user5 = {un: 'dave--2', height: '300', memeId: 12};
  user6 = {un: 'sam10101', height: '300', memeId: 13};
  user7 = {un: 'dante888', height: '300', memeId: 14};
  user8 = {un: 'dante888', height: '300', memeId: 15};

  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6, this.user7, this.user8];
  // users = [this.user1];

  ngOnInit() {
  }

  getMemes() {
    // TODO
  }

  getMemeDetail() {

  }

}
