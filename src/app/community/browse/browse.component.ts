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

  user1 = {height: '300', memeId: 1};

  users = [this.user1];

  ngOnInit() {
  }

  getMemes() {
    // TODO
  }

  getMemeDetail() {

  }

}
